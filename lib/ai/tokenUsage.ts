import { prisma } from '@/lib/prisma'
import {
  getDailyTokenLimitForActor,
  isRegisteredActorId,
} from '@/lib/ai/config'
import { DailyAILimitError } from '@/lib/ai/errors'
import {
  incrementTokenUsage,
  syncDailyQuota,
} from '@/lib/ai/dailyUsageQuota'
import { localUsageDayKey, nextLocalMidnightIso } from '@/lib/ai/usageTimezone'

export type TokenUsageBreakdown = {
  inputTokens: number
  outputTokens: number
  totalTokens: number
}

export type DailyUsageSnapshot = {
  actorId: string
  isRegistered: boolean
  /** Local calendar day for the current usage bucket (`YYYY-MM-DD`). */
  date: string
  lastResetDate: string
  /** Tokens used today (same as `tokensUsed`; named for daily-quota clarity). */
  dailyUsageCount: number
  tokensUsed: number
  requestCount: number
  dailyLimit: number
  percentUsed: number
  lastUpdatedAt: string | null
  resetsAt: string
  timezone: string
}

export async function getDailyUsageSnapshot(
  actorId: string,
  timeZone: string
): Promise<DailyUsageSnapshot> {
  const isRegistered = isRegisteredActorId(actorId)
  const dailyLimit = getDailyTokenLimitForActor(actorId)
  const quota = await syncDailyQuota(actorId, timeZone)
  const tokensUsed = quota.tokensUsed
  const requestCount = quota.requestCount
  const percentUsed =
    dailyLimit > 0 ? Math.min(100, Math.round((tokensUsed / dailyLimit) * 100)) : 0

  return {
    actorId,
    isRegistered,
    date: quota.lastResetDate,
    lastResetDate: quota.lastResetDate,
    dailyUsageCount: tokensUsed,
    tokensUsed,
    requestCount,
    dailyLimit,
    percentUsed,
    lastUpdatedAt: quota.updatedAt?.toISOString() ?? null,
    resetsAt: nextLocalMidnightIso(new Date(), timeZone),
    timezone: timeZone,
  }
}

/**
 * Server-side quota check before calling OpenAI.
 * Syncs local calendar day and resets counters at local midnight.
 */
export async function assertWithinDailyLimit(
  actorId: string,
  timeZone: string
): Promise<void> {
  const dailyLimit = getDailyTokenLimitForActor(actorId)
  const quota = await syncDailyQuota(actorId, timeZone)
  if (quota.tokensUsed >= dailyLimit) {
    throw new DailyAILimitError()
  }
}

/** Record token usage only after a successful LLM completion. */
export async function recordTokenUsage(
  actorId: string,
  timeZone: string,
  usage: TokenUsageBreakdown
): Promise<DailyUsageSnapshot> {
  await incrementTokenUsage(actorId, timeZone, usage.totalTokens)
  return getDailyUsageSnapshot(actorId, timeZone)
}

export type AdminUsageRow = {
  actorId: string
  displayUser: string
  isGuest: boolean
  date: string
  tokensUsed: number
  requestCount: number
  dailyLimit: number
  lastRequestAt: string
}

/** Admin view: actors with usage on the given local calendar day (UTC for ops). */
export async function listAdminUsageForDate(
  dateKey: string = localUsageDayKey(new Date(), 'UTC')
): Promise<AdminUsageRow[]> {
  const rows = await prisma.userAITokenUsage.findMany({
    where: {
      OR: [{ lastResetDate: dateKey }, { date: new Date(`${dateKey}T12:00:00.000Z`) }],
    },
    orderBy: [{ tokensUsed: 'desc' }, { updatedAt: 'desc' }],
  })

  return rows.map((row) => {
    const isGuest = row.userId.startsWith('guest:')
    const displayUser = isGuest
      ? `Guest ${row.userId.slice(6, 14)}…`
      : row.userId
    return {
      actorId: row.userId,
      displayUser,
      isGuest,
      date: row.lastResetDate || dateKey,
      tokensUsed: row.tokensUsed,
      requestCount: row.requestCount,
      dailyLimit: getDailyTokenLimitForActor(row.userId),
      lastRequestAt: row.updatedAt.toISOString(),
    }
  })
}
