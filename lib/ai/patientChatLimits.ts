import { DailyAILimitError } from '@/lib/ai/errors'
import { utcCalendarDate } from '@/lib/ai/tokenUsage'
import {
  incrementPatientChatAiCount,
  isPatientChatLimitColumnAvailable,
  readPatientChatAiCount,
} from '@/lib/ai/tokenUsageDb'

export const DAILY_PATIENT_CHAT_LIMIT_MESSAGE =
  'Daily patient chat AI limit reached. Scripted answers still work — your limit resets tomorrow.'

/** Only AI fallback patient replies count toward this limit (not presets/cache). */
export const GUEST_DAILY_PATIENT_AI_MESSAGES = 15
export const REGISTERED_DAILY_PATIENT_AI_MESSAGES = 50

export function getDailyPatientChatLimit(isRegistered: boolean): number {
  return isRegistered ? REGISTERED_DAILY_PATIENT_AI_MESSAGES : GUEST_DAILY_PATIENT_AI_MESSAGES
}

export { isPatientChatLimitColumnAvailable }

export async function assertWithinDailyPatientChatLimit(
  actorId: string,
  isRegistered: boolean
): Promise<void> {
  if (!(await isPatientChatLimitColumnAvailable())) return

  const dailyLimit = getDailyPatientChatLimit(isRegistered)
  const date = utcCalendarDate()
  const used = await readPatientChatAiCount(actorId, date)
  if (used >= dailyLimit) {
    throw new DailyAILimitError(DAILY_PATIENT_CHAT_LIMIT_MESSAGE)
  }
}

export async function recordPatientChatAIUsage(actorId: string): Promise<void> {
  if (!(await isPatientChatLimitColumnAvailable())) return
  await incrementPatientChatAiCount(actorId)
}
