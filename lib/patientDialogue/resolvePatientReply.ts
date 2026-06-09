import type { Scenario } from '@/data/scenarios'
import { getOffTopicPatientReply, isOffTopicDoctorQuestion } from '@/lib/offTopicQuestions'
import {
  detectScenarioBucket,
  getPresetPatientResponse,
  tryPresetPatientResponse,
  type ChatMessage,
} from '@/lib/presetPatientResponses'
import { PRESET_MATCH_THRESHOLD } from '@/lib/patientDialogue/matching'

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
 * Fast path before AI: off-topic redirect and high-confidence preset matches.
 * Ensures the same scripted answers for every user when a scenario has a preset row.
 */
export async function resolvePreAiPatientReply(
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

  const preset = tryHighConfidencePresetReply(scenario, messages)
  if (preset) {
    return preset
  }

  return null
}

/** Strong preset match only — used after AI failure, never the case defaultAnswer. */
export function tryHighConfidencePresetReply(
  scenario: Scenario,
  messages: ChatMessage[]
): ResolvedPatientReply | null {
  const presetTry = tryPresetPatientResponse(scenario, messages)
  if (!presetTry.matched || presetTry.score < PRESET_MATCH_THRESHOLD) {
    return null
  }
  return {
    message: presetTry.answer,
    source: 'preset',
    scripted: true,
  }
}

/** @deprecated Use resolvePreAiPatientReply — kept for imports */
export async function resolveScriptedPatientReply(
  scenario: Scenario,
  messages: ChatMessage[]
): Promise<ResolvedPatientReply | null> {
  return resolvePreAiPatientReply(scenario, messages)
}

export { saveLearnedPatientResponse } from '@/lib/patientDialogue/learnedResponses'
export { getPresetPatientResponse, detectScenarioBucket }
