import type { Scenario } from '@/data/scenarios'
import { buildDeterministicAssessment, type AssessRequestBody } from '@/lib/debrief/generateDebrief'

/** Aligned with post-scenario debrief: four categories on a 200-point scale. */
export type RubricBreakdown = {
  patientInterview: number
  diagnosticTesting: number
  clinicalReasoning: number
  finalDiagnosis: number
}

export type PerformanceEvaluation = {
  score: number
  feedback: string
  rubric: RubricBreakdown
  level: string
}

type Message = { role: string; content: string }

export type ScoringContext = {
  finalDxId?: string | null
  viewedExamSections?: string[]
  orderedTestIds?: string[]
  differentialIds?: string[]
  differentialDetailed?: Array<{ dxId: string; rank?: number; confidence?: string; note?: string }>
  redFlagsFound?: string[]
}

/** Map 0–200 scenario score to performance label */
export function scoreToLevel(score: number): string {
  if (score >= 180) return 'Excellent'
  if (score >= 160) return 'Good'
  if (score >= 130) return 'Fair'
  if (score >= 100) return 'Needs Improvement'
  return 'Poor'
}

export function evaluatePerformance(
  messages: Message[],
  scenario: Scenario,
  context: ScoringContext = {}
): PerformanceEvaluation {
  const body: AssessRequestBody = {
    scenarioId: scenario.id,
    chat: messages,
    viewedExamSections: context.viewedExamSections,
    orderedTests: context.orderedTestIds,
    differentialDetailed: context.differentialDetailed?.map((d, i) => ({
      dxId: d.dxId,
      rank: d.rank ?? i + 1,
      confidence: d.confidence ?? 'medium',
      note: d.note,
    })),
    finalDxId: context.finalDxId,
    redFlagsFound: context.redFlagsFound,
  }

  const assessment = buildDeterministicAssessment(body)
  const rubric = assessment.rubric200
  const feedbackParts: string[] = []

  feedbackParts.push(
    `Overall clinical score: ${rubric.total}/200 (${assessment.overallRating}).`
  )

  if (rubric.scoreCapApplied != null) {
    feedbackParts.push(
      'Score was capped because the clinical process did not support the final diagnosis.'
    )
  }

  if (assessment.clinicalFeedback.interview.missedImportant.length > 0) {
    feedbackParts.push(
      `Missed history topics: ${assessment.clinicalFeedback.interview.missedImportant.slice(0, 2).join('; ')}.`
    )
  }

  if (assessment.clinicalFeedback.testing.missedEssential.length > 0) {
    feedbackParts.push(
      `Missed essential tests: ${assessment.clinicalFeedback.testing.missedEssential.slice(0, 2).join('; ')}.`
    )
  }

  return {
    score: rubric.total,
    feedback: feedbackParts.join(' '),
    rubric: {
      patientInterview: rubric.patientInterview,
      diagnosticTesting: rubric.diagnosticTesting,
      clinicalReasoning: rubric.clinicalReasoning,
      finalDiagnosis: rubric.finalDiagnosis,
    },
    level: assessment.overallRating,
  }
}
