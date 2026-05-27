import { DailyAILimitError } from '@/lib/ai/errors'
import {
  incrementPatientChatUsage,
  syncDailyQuota,
} from '@/lib/ai/dailyUsageQuota'
import { isPatientChatLimitColumnAvailable } from '@/lib/ai/tokenUsageDb'

export const DAILY_PATIENT_CHAT_LIMIT_MESSAGE =
  'Daily patient chat AI limit reached. Scripted answers still work — Daily AI limit resets at midnight.'

/** Only AI fallback patient replies count toward this limit (not presets/cache). */
export const GUEST_DAILY_PATIENT_AI_MESSAGES = 15
export const REGISTERED_DAILY_PATIENT_AI_MESSAGES = 50

export function getDailyPatientChatLimit(isRegistered: boolean): number {
  return isRegistered ? REGISTERED_DAILY_PATIENT_AI_MESSAGES : GUEST_DAILY_PATIENT_AI_MESSAGES
}

export { isPatientChatLimitColumnAvailable }

export async function assertWithinDailyPatientChatLimit(
  actorId: string,
  isRegistered: boolean,
  timeZone: string
): Promise<void> {
  if (!(await isPatientChatLimitColumnAvailable())) return

  const dailyLimit = getDailyPatientChatLimit(isRegistered)
  const quota = await syncDailyQuota(actorId, timeZone)
  if (quota.patientChatAiCount >= dailyLimit) {
    throw new DailyAILimitError(DAILY_PATIENT_CHAT_LIMIT_MESSAGE)
  }
}

export async function recordPatientChatAIUsage(
  actorId: string,
  timeZone: string
): Promise<void> {
  if (!(await isPatientChatLimitColumnAvailable())) return
  await incrementPatientChatUsage(actorId, timeZone)
}

export async function readPatientChatAiCount(
  actorId: string,
  timeZone: string
): Promise<number> {
  if (!(await isPatientChatLimitColumnAvailable())) return 0
  const quota = await syncDailyQuota(actorId, timeZone)
  return quota.patientChatAiCount
}
