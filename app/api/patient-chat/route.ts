import { NextRequest, NextResponse } from 'next/server'
import { scenarios } from '@/data/scenarios'
import { getMockPatientResponse } from '@/lib/mockResponses'
import {
  resolvePreAiPatientReply,
  saveLearnedPatientResponse,
  tryHighConfidencePresetReply,
} from '@/lib/patientDialogue/resolvePatientReply'
import { callManagedLLM } from '@/lib/ai/callManagedLLM'
import { dailyLimitJsonResponse, isDailyLimitResponse } from '@/lib/ai/apiHelpers'
import {
  assertWithinDailyPatientChatLimit,
  isPatientChatLimitColumnAvailable,
  recordPatientChatAIUsage,
} from '@/lib/ai/patientChatLimits'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import { readAIModelForExport, shouldAttemptOllamaForPatientChat } from '@/lib/llm'

export const dynamic = 'force-dynamic'

const USE_DEMO_MOCKS = process.env.DEMO_MODE === 'true'

function buildPatientSystemPrompt(scenario: (typeof scenarios)[0]): string {
  const { patientPersona, aiInstructions } = scenario
  return `You are a fictional patient in a Medcess clinical simulation (educational only).
Your name is ${patientPersona.name}, age ${patientPersona.age}, gender ${patientPersona.gender}.
Chief complaint: ${patientPersona.chiefComplaint}.
Background: ${patientPersona.background}.
Vital signs: HR ${patientPersona.vitals.heartRate} bpm, BP ${patientPersona.vitals.bloodPressure}, RR ${patientPersona.vitals.respiratoryRate}/min, O2 Sat ${patientPersona.vitals.oxygenSat}, Temp ${patientPersona.vitals.temperature}.

${aiInstructions.patientStyle}

CRITICAL RULES:
${aiInstructions.behaviorRules.map((rule) => `- ${rule}`).join('\n')}

DO NOT reveal directly:
${aiInstructions.doNotRevealDirectly.map((item) => `- ${item}`).join('\n')}

Key history points you know (reveal only if asked specifically):
${patientPersona.keyHistoryPoints.map((point) => `- ${point}`).join('\n')}

Answer ONLY as the patient in first person. Sound like a real patient in the exam room: usually 2–4 sentences, natural and conversational, with enough detail that the doctor can follow your story (timing, location, quality, what worries you). When asked an open question, include one concrete symptom detail and how you feel. Do not lecture or list bullet points. Do NOT give medical advice or diagnoses.

If the doctor greets you casually (e.g. "what's up", "how are you"), respond naturally in character — acknowledge them briefly, then explain why you're here today using your chief complaint in your own words. Do not repeat the same paragraph verbatim on every message; vary your wording based on what they just asked.

If the doctor asks something unrelated to your health, symptoms, or medical visit (for example homework, recipes, sports, or trivia), do NOT answer the off-topic question. Respond briefly in character — confused or politely puzzled — e.g. "Excuse me, doctor, why are you asking me that?" and redirect to why you came in today.`
}

async function callPatientAI(
  scenario: (typeof scenarios)[0],
  messages: Array<{ role: string; content: string }>,
  actor: Awaited<ReturnType<typeof resolveAIActorFromRequest>>,
  usePatientMessageQuota: boolean
): Promise<string> {
  const systemPrompt = buildPatientSystemPrompt(scenario)
  const llmMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({
      role: msg.role === 'doctor' ? 'user' : 'assistant',
      content: msg.content,
    })),
  ]

  const { content: patientResponse } = await callManagedLLM(llmMessages, actor, {
    maxTokens: 400,
    temperature: 0.75,
    /** When patientChatAiCount column is missing, count tokens toward the daily AI limit instead. */
    skipQuota: usePatientMessageQuota,
  })

  const trimmed = String(patientResponse ?? '').trim()
  if (!trimmed) {
    throw new Error('OpenAI returned an empty response')
  }
  return trimmed
}

export async function POST(request: NextRequest) {
  let bodyData: { scenarioId?: string; messages?: Array<{ role: string; content: string }> } = {}
  const actor = await resolveAIActorFromRequest(request)

  try {
    const body = await request.json()
    const { scenarioId, messages } = body
    bodyData = { scenarioId, messages }

    if (!scenarioId || !messages) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'scenarioId and messages are required' },
        { status: 400 }
      )
    }

    const scenario = scenarios.find((s) => s.id === scenarioId)
    if (!scenario) {
      return NextResponse.json({ error: 'Scenario not found' }, { status: 404 })
    }

    if (USE_DEMO_MOCKS) {
      const mockResponse = getMockPatientResponse(scenarioId, messages)
      return NextResponse.json({
        message: mockResponse,
        source: 'demo-mock',
      })
    }

    // Off-topic redirect + exact learned Q→A only (no preset bucket / fuzzy cache)
    const preAi = await resolvePreAiPatientReply(scenario, messages)
    if (preAi) {
      const res = NextResponse.json({
        message: preAi.message,
        source: preAi.source,
      })
      applyActorCookie(res, actor)
      return res
    }

    // Primary path: live AI for all clinical / unknown questions
    if (shouldAttemptOllamaForPatientChat()) {
      const usePatientMessageQuota = await isPatientChatLimitColumnAvailable()
      await assertWithinDailyPatientChatLimit(actor.actorId, actor.isRegistered)

      const trimmed = await callPatientAI(scenario, messages, actor, usePatientMessageQuota)
      const lastDoctor =
        [...messages].reverse().find((m) => m.role === 'doctor' || m.role === 'user')?.content || ''

      if (usePatientMessageQuota) {
        await recordPatientChatAIUsage(actor.actorId)
      }

      void saveLearnedPatientResponse(scenario.id, lastDoctor, trimmed).catch((err) => {
        console.error('Failed to cache learned patient response:', err)
      })

      const res = NextResponse.json({
        message: trimmed,
        source: 'ai',
        model: readAIModelForExport(),
      })
      applyActorCookie(res, actor)
      return res
    }

    // No API key: strong preset match only (never generic defaultAnswer)
    const preset = tryHighConfidencePresetReply(scenario, messages)
    if (preset) {
      const res = NextResponse.json({
        message: preset.message,
        source: preset.source,
      })
      applyActorCookie(res, actor)
      return res
    }

    return NextResponse.json(
      {
        error: 'Patient chat AI is not configured',
        details:
          'Set OPENAI_API_KEY in your environment to enable live patient replies. Scripted answers only apply to exact preset questions when AI is off.',
      },
      { status: 503 }
    )
  } catch (error: unknown) {
    console.error('Error in patient-chat:', error)

    if (isDailyLimitResponse(error)) {
      const res = dailyLimitJsonResponse()
      applyActorCookie(res, actor)
      return res
    }

    const err = error as { message?: string; name?: string }
    const scenario = scenarios.find((s) => s.id === bodyData.scenarioId)

    if (scenario) {
      const preset = tryHighConfidencePresetReply(scenario, bodyData.messages || [])
      if (preset) {
        const safeReason =
          err.message && err.message.length < 280
            ? err.message
            : err.message?.slice(0, 280) ?? 'Unknown error'
        return NextResponse.json({
          message: preset.message,
          source: 'preset-fallback',
          fallbackReason: safeReason,
        })
      }
    }

    const shouldUseDemo = USE_DEMO_MOCKS || process.env.FALLBACK_TO_DEMO === 'true'

    if (
      shouldUseDemo &&
      (err.message?.includes('fetch failed') ||
        err.message?.includes('OpenAI') ||
        err.message?.includes('ECONNREFUSED'))
    ) {
      const mockResponse = getMockPatientResponse(
        bodyData.scenarioId || '',
        bodyData.messages || []
      )
      return NextResponse.json({
        message: mockResponse,
        source: 'demo-mock',
      })
    }

    const errorMessage = err.message || 'Failed to get patient response'
    const res = NextResponse.json(
      {
        error: errorMessage,
        details: errorMessage,
        type: err?.name || 'Error',
      },
      { status: 500 }
    )
    applyActorCookie(res, actor)
    return res
  }
}
