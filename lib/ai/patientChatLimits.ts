import { prisma } from '@/lib/prisma'
import { DailyAILimitError } from '@/lib/ai/errors'
import { utcCalendarDate } from '@/lib/ai/tokenUsage'

export const DAILY_PATIENT_CHAT_LIMIT_MESSAGE =
  'Daily patient chat AI limit reached. Scripted answers still work — your limit resets tomorrow.'

/** Only AI fallback patient replies count toward this limit (not presets/cache). */
export const GUEST_DAILY_PATIENT_AI_MESSAGES = 15
export const REGISTERED_DAILY_PATIENT_AI_MESSAGES = 50

export function getDailyPatientChatLimit(isRegistered: boolean): number {
  return isRegistered ? REGISTERED_DAILY_PATIENT_AI_MESSAGES : GUEST_DAILY_PATIENT_AI_MESSAGES
}

export async function assertWithinDailyPatientChatLimit(
  actorId: string,
  isRegistered: boolean
): Promise<void> {
  const dailyLimit = getDailyPatientChatLimit(isRegistered)
  const date = utcCalendarDate()

  await prisma.$transaction(
    async (tx) => {
      const row = await tx.userAITokenUsage.findUnique({
        where: { userId_date: { userId: actorId, date } },
      })
      const used = row?.patientChatAiCount ?? 0
      if (used >= dailyLimit) {
        throw new DailyAILimitError(DAILY_PATIENT_CHAT_LIMIT_MESSAGE)
      }
    },
    { isolationLevel: 'Serializable' }
  )
}

export async function recordPatientChatAIUsage(actorId: string): Promise<void> {
  const date = utcCalendarDate()
  await prisma.userAITokenUsage.upsert({
    where: { userId_date: { userId: actorId, date } },
    create: {
      userId: actorId,
      date,
      patientChatAiCount: 1,
      requestCount: 0,
      tokensUsed: 0,
    },
    update: {
      patientChatAiCount: { increment: 1 },
    },
  })
}
