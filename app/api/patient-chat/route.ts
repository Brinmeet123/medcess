import { NextRequest, NextResponse } from 'next/server'
import { scenarios } from '@/data/scenarios'
import { getMockPatientResponse } from '@/lib/mockResponses'
import { resolvePreAiPatientReply } from '@/lib/patientDialogue/resolvePatientReply'
import { callManagedLLM } from '@/lib/ai/callManagedLLM'
import { dailyLimitJsonResponse, isDailyLimitResponse } from '@/lib/ai/apiHelpers'
import {
  assertWithinDailyPatientChatLimit,
  isPatientChatLimitColumnAvailable,
  recordPatientChatAIUsage,
} from '@/lib/ai/patientChatLimits'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import {
  PATIENT_AI_LENGTH_RULES,
  PATIENT_AI_TEMPERATURE,
} from '@/lib/patientDialogue/patientResponseStyle'
import { delayBeforeScriptedPatientReply } from '@/lib/patientDialogue/scriptedReplyDelay'
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

Key history points you know (reveal only if asked specifically — one or two per answer, not all at once):
${patientPersona.keyHistoryPoints.map((point) => `- ${point}`).join('\n')}

${PATIENT_AI_LENGTH_RULES}

Answer ONLY as the patient in first person. Do NOT give medical advice or diagnoses.

If the doctor greets you casually (e.g. "what's up", "how are you"), one or two sentences: brief hello, then why you came in (chief complaint only).

If the doctor asks something unrelated to your health, symptoms, or medical visit (for example homework, recipes, sports, or trivia), do NOT answer the off-topic question. One short sentence in character, then redirect to why you came in.`
}

async function callPatientAI(
  scenario: (typeof scenarios)[0],
  messages: Array<{ role: string; content: string }>,
  actor: Awaited<ReturnType<typeof resolveAIActorFromRequest>>
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
    temperature: PATIENT_AI_TEMPERATURE,
    skipCache: true,
    skipQuota: false,
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
      await delayBeforeScriptedPatientReply(mockResponse)
      return NextResponse.json({
        message: mockResponse,
        source: 'demo-mock',
      })
    }

    const preAi = await resolvePreAiPatientReply(scenario, messages)
    if (preAi) {
      if (preAi.scripted) {
        await delayBeforeScriptedPatientReply(preAi.message)
      }
      const res = NextResponse.json({
        message: preAi.message,
        source: preAi.source,
        ...(preAi.scripted ? { model: readAIModelForExport() } : {}),
      })
      applyActorCookie(res, actor)
      return res
    }

    if (!shouldAttemptOllamaForPatientChat()) {
      return NextResponse.json(
        {
          error: 'Patient chat AI is not configured',
          details:
            'Set OPENAI_API_KEY in your environment to enable live patient replies.',
        },
        { status: 503 }
      )
    }

    if (await isPatientChatLimitColumnAvailable()) {
      await assertWithinDailyPatientChatLimit(actor.actorId, actor.timezone)
    }

    const trimmed = await callPatientAI(scenario, messages, actor)

    if (await isPatientChatLimitColumnAvailable()) {
      await recordPatientChatAIUsage(actor.actorId, actor.timezone)
    }

    const res = NextResponse.json({
      message: trimmed,
      source: 'ai',
      model: readAIModelForExport(),
    })
    applyActorCookie(res, actor)
    return res
  } catch (error: unknown) {
    console.error('Error in patient-chat:', error)

    if (isDailyLimitResponse(error)) {
      const res = dailyLimitJsonResponse()
      applyActorCookie(res, actor)
      return res
    }

    const err = error as { message?: string; name?: string }

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
      await delayBeforeScriptedPatientReply(mockResponse)
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
