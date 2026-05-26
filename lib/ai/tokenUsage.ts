import { prisma } from '@/lib/prisma'
import { getDailyTokenLimit } from '@/lib/ai/config'
import { DailyAILimitError } from '@/lib/ai/errors'
import { utcCalendarDate, utcUsageDayKey, nextUtcResetIso } from '@/lib/ai/dailyQuota'
import { incrementDailyTokenUsage, readDailyTokenUsageRow } from '@/lib/ai/tokenUsageDb'

export { utcCalendarDate, utcUsageDayKey, nextUtcResetIso }

export type TokenUsageBreakdown = {
  inputTokens: number
  outputTokens: number
  totalTokens: number
}

export type DailyUsageSnapshot = {
  actorId: string
  isRegistered: boolean
  date: string
  tokensUsed: number
  requestCount: number
  dailyLimit: number
  percentUsed: number
  lastUpdatedAt: string | null
  resetsAt: string
}

export async function getDailyUsageSnapshot(
  actorId: string,
  isRegistered: boolean,
  date: Date = utcCalendarDate()
): Promise<DailyUsageSnapshot> {
  const dailyLimit = getDailyTokenLimit(isRegistered)
  const row = await readDailyTokenUsageRow(actorId, date)
  const tokensUsed = row?.tokensUsed ?? 0
  const requestCount = row?.requestCount ?? 0
  const percentUsed = dailyLimit > 0 ? Math.min(100, Math.round((tokensUsed / dailyLimit) * 100)) : 0

  return {
    actorId,
    isRegistered,
    date: utcUsageDayKey(date),
    tokensUsed,
    requestCount,
    dailyLimit,
    percentUsed,
    lastUpdatedAt: row?.updatedAt?.toISOString() ?? null,
    resetsAt: nextUtcResetIso(),
  }
}

/**
 * Server-side quota check before calling OpenAI.
 * Uses a serializable transaction to reduce race windows across tabs.
 */
export async function assertWithinDailyLimit(
  actorId: string,
  isRegistered: boolean
): Promise<void> {
  const dailyLimit = getDailyTokenLimit(isRegistered)
  const date = utcCalendarDate()

  const row = await readDailyTokenUsageRow(actorId, date)
  const used = row?.tokensUsed ?? 0
  if (used >= dailyLimit) {
    throw new DailyAILimitError()
  }
}

/** Record token usage only after a successful LLM completion. */
export async function recordTokenUsage(
  actorId: string,
  usage: TokenUsageBreakdown
): Promise<DailyUsageSnapshot> {
  const date = utcCalendarDate()
  await incrementDailyTokenUsage(actorId, usage.totalTokens, date)

  const isRegistered = !actorId.startsWith('guest:')
  return getDailyUsageSnapshot(actorId, isRegistered, date)
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

export async function listAdminUsageForDate(date: Date = utcCalendarDate()): Promise<AdminUsageRow[]> {
  const rows = await prisma.userAITokenUsage.findMany({
    where: { date },
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
      date: utcUsageDayKey(date),
      tokensUsed: row.tokensUsed,
      requestCount: row.requestCount,
      dailyLimit: getDailyTokenLimit(!isGuest),
      lastRequestAt: row.updatedAt.toISOString(),
    }
  })
}
