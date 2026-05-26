import type { Scenario } from '@/data/scenarios'
import { getOffTopicPatientReply, isOffTopicDoctorQuestion } from '@/lib/offTopicQuestions'
import {
  detectScenarioBucket,
  getPresetPatientResponse,
  tryPresetPatientResponse,
  type ChatMessage,
} from '@/lib/presetPatientResponses'
import {
  findLearnedPatientResponse,
  saveLearnedPatientResponse,
} from '@/lib/patientDialogue/learnedResponses'

export type PatientReplySource =
  | 'preset'
  | 'cache'
  | 'ai'
  | 'preset-fallback'
  | 'demo-mock'

export type ResolvedPatientReply = {
  message: string
  source: PatientReplySource
  /** True when no AI API call was needed */
  scripted: boolean
}

export function getLastDoctorMessage(messages: ChatMessage[]): string {
  return (
    [...messages].reverse().find((m) => m.role === 'doctor' || m.role === 'user')?.content || ''
  )
}

/**
 * Scripted layer: preset case Q&A → learned cache. Returns null if AI is required.
 */
export async function resolveScriptedPatientReply(
  scenario: Scenario,
  messages: ChatMessage[]
): Promise<ResolvedPatientReply | null> {
  const lastDoctorMessage = getLastDoctorMessage(messages)
  if (!lastDoctorMessage.trim()) {
    return {
      message: "I'm not sure what you're asking.",
      source: 'preset',
      scripted: true,
    }
  }

  if (isOffTopicDoctorQuestion(lastDoctorMessage, scenario)) {
    return {
      message: getOffTopicPatientReply(scenario.patientPersona.name, lastDoctorMessage),
      source: 'preset',
      scripted: true,
    }
  }

  const presetTry = tryPresetPatientResponse(scenario, messages)
  if (presetTry.matched) {
    return {
      message: presetTry.answer,
      source: 'preset',
      scripted: true,
    }
  }

  const bucket = detectScenarioBucket(scenario)
  if (bucket) {
    const cached = await findLearnedPatientResponse(scenario.id, lastDoctorMessage)
    if (cached) {
      return {
        message: cached.response,
        source: 'cache',
        scripted: true,
      }
    }
  }

  return null
}

export { saveLearnedPatientResponse, getPresetPatientResponse }
