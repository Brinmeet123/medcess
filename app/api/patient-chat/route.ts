import { NextRequest, NextResponse } from 'next/server'
import { scenarios } from '@/data/scenarios'
import { getMockPatientResponse } from '@/lib/mockResponses'
import { getPresetPatientResponse } from '@/lib/presetPatientResponses'
import { callManagedLLM } from '@/lib/ai/callManagedLLM'
import { dailyLimitJsonResponse, isDailyLimitResponse } from '@/lib/ai/apiHelpers'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import { readAIModelForExport, shouldAttemptOllamaForPatientChat } from '@/lib/llm'

export const dynamic = 'force-dynamic'

const USE_DEMO_MOCKS = process.env.DEMO_MODE === 'true'
const USE_PRESET_FALLBACK = process.env.USE_PRESET_FALLBACK !== 'false'

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

    const scenario = scenarios.find(s => s.id === scenarioId)
    if (!scenario) {
      return NextResponse.json({ error: 'Scenario not found' }, { status: 404 })
    }

    // If demo mode is intentionally enabled, use demo mocks first
    if (USE_DEMO_MOCKS) {
      const mockResponse = getMockPatientResponse(scenarioId, messages)
      return NextResponse.json({
        message: mockResponse,
        source: 'demo-mock',
      })
    }

    // If AI is disabled or missing configuration, use preset responses.
    if (!shouldAttemptOllamaForPatientChat()) {
      const presetResponse = getPresetPatientResponse(scenario, messages)
      return NextResponse.json({
        message: presetResponse,
        source: 'preset',
      })
    }

    const { patientPersona, aiInstructions } = scenario

    const systemPrompt = `You are a fictional patient in a Medcess clinical simulation (educational only).
Your name is ${patientPersona.name}, age ${patientPersona.age}, gender ${patientPersona.gender}.
Chief complaint: ${patientPersona.chiefComplaint}.
Background: ${patientPersona.background}.
Vital signs: HR ${patientPersona.vitals.heartRate} bpm, BP ${patientPersona.vitals.bloodPressure}, RR ${patientPersona.vitals.respiratoryRate}/min, O2 Sat ${patientPersona.vitals.oxygenSat}, Temp ${patientPersona.vitals.temperature}.

${aiInstructions.patientStyle}

CRITICAL RULES:
${aiInstructions.behaviorRules.map(rule => `- ${rule}`).join('\n')}

DO NOT reveal directly:
${aiInstructions.doNotRevealDirectly.map(item => `- ${item}`).join('\n')}

Key history points you know (reveal only if asked specifically):
${patientPersona.keyHistoryPoints.map(point => `- ${point}`).join('\n')}

Answer ONLY as the patient in first person. Sound like a real patient in the exam room: usually 2–4 sentences, natural and conversational, with enough detail that the doctor can follow your story (timing, location, quality, what worries you). When asked an open question, include one concrete symptom detail and how you feel. Do not lecture or list bullet points. Do NOT give medical advice or diagnoses.

If the doctor asks something unrelated to your health, symptoms, or medical visit (for example homework, recipes, sports, or trivia), do NOT answer the off-topic question. Respond briefly in character — confused or politely puzzled — e.g. "Excuse me, doctor, why are you asking me that?" and redirect to why you came in today.`

    const llmMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'doctor' ? 'user' : 'assistant',
        content: msg.content,
      })),
    ]

    const { content: patientResponse } = await callManagedLLM(llmMessages, actor, {
      maxTokens: 400,
      temperature: 0.75,
    })

    // If LLM returns empty or invalid content, use preset fallback
    if (!patientResponse || !String(patientResponse).trim()) {
      if (USE_PRESET_FALLBACK) {
        const presetResponse = getPresetPatientResponse(scenario, messages)
        return NextResponse.json({
          message: presetResponse,
          source: 'preset-fallback',
        })
      }

      return NextResponse.json(
        { error: 'Empty response from AI model' },
        { status: 500 }
      )
    }

    const res = NextResponse.json({
      message: patientResponse,
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

    const scenario =
      scenarios.find(s => s.id === bodyData.scenarioId)

    // 1. Preferred fallback: preset in-character scenario responses
    if (USE_PRESET_FALLBACK && scenario) {
      try {
        const presetResponse = getPresetPatientResponse(
          scenario,
          bodyData.messages || []
        )

        return NextResponse.json({
          message: presetResponse,
          source: 'preset-fallback',
        })
      } catch (presetError) {
        console.error('Preset fallback failed:', presetError)
      }
    }

    // 2. Secondary fallback: your existing mock demo responses
    const shouldUseDemo =
      USE_DEMO_MOCKS || process.env.FALLBACK_TO_DEMO === 'true'

    if (
      shouldUseDemo &&
      (err.message?.includes('fetch failed') ||
        err.message?.includes('OpenAI') ||
        err.message?.includes('ECONNREFUSED'))
    ) {
      console.log('LLM unavailable, falling back to demo mode')
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
    const isOpenAIIssue =
      errorMessage.includes('OpenAI') ||
      errorMessage.includes('OPENAI_API_KEY') ||
      errorMessage.includes('ECONNREFUSED') ||
      errorMessage.includes('fetch failed')

    const hint = isOpenAIIssue
      ? 'Set OPENAI_API_KEY and optionally AI_MODEL / OPENAI_BASE_URL. Preset fallback should handle most history questions automatically.'
      : 'Check the error above. Preset fallback should handle many history questions even if AI is down.'

    const res = NextResponse.json(
      {
        error: errorMessage,
        details: errorMessage,
        type: err?.name || 'Error',
        demoModeAvailable: hint,
      },
      { status: 500 }
    )
    applyActorCookie(res, actor)
    return res
  }
}