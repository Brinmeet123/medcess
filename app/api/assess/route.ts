import { NextRequest, NextResponse } from 'next/server'
import { scenarios } from '@/data/scenarios'
import { getMockAssessment } from '@/lib/mockResponses'
import { buildDeterministicAssessment } from '@/lib/debrief/generateDebrief'
import { maybePolishDeterministicAssessment } from '@/lib/debrief/polishDebrief'
import { delayForAssessment } from '@/lib/patientDialogue/responseDelay'
import { dailyLimitJsonResponse, isDailyLimitResponse } from '@/lib/ai/apiHelpers'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'

export const dynamic = 'force-dynamic'

const USE_DEMO_MOCKS = process.env.DEMO_MODE === 'true'

export async function POST(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)
  try {
    const body = await request.json()
    const {
      scenarioId,
      stability,
      redFlagsFound,
      chiefComplaint,
      chat,
      hpi,
      background,
      problemRep,
      viewedExamSections,
      differentials,
      orderedTests,
      viewedClinicalDataSections,
      reasoningUpdates,
      finalDiagnosis,
      patientExplanation,
      plan,
      differentialDetailed,
      finalDxId,
      missingMustNotMiss,
      selectedDifferentialIds,
      finalDiagnosisId,
      guidedReasoningAnswers,
    } = body

    const scenario = scenarios.find((s) => s.id === scenarioId)
    if (!scenario) {
      return NextResponse.json({ error: 'Scenario not found' }, { status: 404 })
    }

    if (USE_DEMO_MOCKS) {
      const deterministic = buildDeterministicAssessment({
        scenarioId,
        chat,
        viewedExamSections,
        orderedTests,
        viewedClinicalDataSections,
        differentialDetailed,
        finalDxId,
        redFlagsFound,
        guidedReasoningAnswers,
      })
      await delayForAssessment()
      const out = await maybePolishDeterministicAssessment(deterministic, actor)
      const res = NextResponse.json({ ...out, source: 'demo-mock' })
      applyActorCookie(res, actor)
      return res
    }

    void stability
    void chiefComplaint
    void hpi
    void background
    void problemRep
    void differentials
    void reasoningUpdates
    void finalDiagnosis
    void patientExplanation
    void plan
    void missingMustNotMiss
    void selectedDifferentialIds
    void finalDiagnosisId

    const deterministic = buildDeterministicAssessment({
      scenarioId,
      chat,
      viewedExamSections,
      orderedTests,
      viewedClinicalDataSections,
      differentialDetailed,
      finalDxId,
      redFlagsFound,
      guidedReasoningAnswers,
    })

    await delayForAssessment()

    const out = await maybePolishDeterministicAssessment(deterministic, actor)

    const res = NextResponse.json(out)
    applyActorCookie(res, actor)
    return res
  } catch (error: unknown) {
    console.error('Error in assess:', error)

    if (isDailyLimitResponse(error)) {
      const res = dailyLimitJsonResponse()
      applyActorCookie(res, actor)
      return res
    }

    const err = error as { message?: string }

    const shouldUseDemo = USE_DEMO_MOCKS || process.env.FALLBACK_TO_DEMO === 'true'

    if (
      shouldUseDemo &&
      (err?.message?.includes('fetch failed') ||
        err?.message?.includes('Ollama') ||
        err?.message?.includes('ECONNREFUSED'))
    ) {
      return NextResponse.json({ ...getMockAssessment(), source: 'demo-mock' })
    }

    const errorMessage = err?.message || 'Failed to generate assessment'
    const res = NextResponse.json(
      {
        error: errorMessage,
        details: err?.message || 'Unknown error',
        demoModeAvailable:
          'Set DEMO_MODE=true for mocks, or report this error if the deterministic debrief failed.',
      },
      { status: 500 }
    )
    applyActorCookie(res, actor)
    return res
  }
}
