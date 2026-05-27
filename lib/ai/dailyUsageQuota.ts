import { prisma } from '@/lib/prisma'
import { localUsageDayKey } from '@/lib/ai/usageTimezone'

export type DailyQuotaRecord = {
  tokensUsed: number
  requestCount: number
  /** Live AI patient-chat messages used today (local calendar day). */
  patientChatAiCount: number
  lastResetDate: string
  updatedAt: Date | null
}

type QuotaColumns = {
  lastResetDate: boolean
  userIdUnique: boolean
}

let quotaColumns: QuotaColumns | null = null

async function detectQuotaColumns(): Promise<QuotaColumns> {
  if (quotaColumns) return quotaColumns
  const rows = await prisma.$queryRaw<{ lastResetDate: boolean; userIdUnique: boolean }[]>`
    SELECT
      EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'UserAITokenUsage'
          AND column_name = 'lastResetDate'
      ) AS "lastResetDate",
      EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public'
          AND tablename = 'UserAITokenUsage'
          AND indexname = 'UserAITokenUsage_userId_key'
      ) AS "userIdUnique"
  `
  quotaColumns = {
    lastResetDate: Boolean(rows[0]?.lastResetDate),
    userIdUnique: Boolean(rows[0]?.userIdUnique),
  }
  return quotaColumns
}

/**
 * Ensure usage row exists and counters reflect the current local calendar day.
 * Resets tokensUsed, requestCount, and patientChatAiCount at local midnight.
 */
export async function syncDailyQuota(
  actorId: string,
  timeZone: string
): Promise<DailyQuotaRecord> {
  const today = localUsageDayKey(new Date(), timeZone)
  const cols = await detectQuotaColumns()

  if (cols.lastResetDate && cols.userIdUnique) {
    return syncDailyQuotaModern(actorId, today)
  }

  return syncDailyQuotaLegacy(actorId, today)
}

async function syncDailyQuotaModern(actorId: string, today: string): Promise<DailyQuotaRecord> {
  const existing = await prisma.userAITokenUsage.findUnique({
    where: { userId: actorId },
    select: {
      tokensUsed: true,
      requestCount: true,
      patientChatAiCount: true,
      lastResetDate: true,
      updatedAt: true,
    },
  })

  if (!existing) {
    const created = await prisma.userAITokenUsage.create({
      data: {
        userId: actorId,
        lastResetDate: today,
        tokensUsed: 0,
        requestCount: 0,
        patientChatAiCount: 0,
      },
      select: {
        tokensUsed: true,
        requestCount: true,
        patientChatAiCount: true,
        lastResetDate: true,
        updatedAt: true,
      },
    })
    return mapRecord(created)
  }

  if (existing.lastResetDate !== today) {
    const reset = await prisma.userAITokenUsage.update({
      where: { userId: actorId },
      data: {
        lastResetDate: today,
        tokensUsed: 0,
        requestCount: 0,
        patientChatAiCount: 0,
      },
      select: {
        tokensUsed: true,
        requestCount: true,
        patientChatAiCount: true,
        lastResetDate: true,
        updatedAt: true,
      },
    })
    return mapRecord(reset)
  }

  return mapRecord(existing)
}

/** Pre-migration: one row per UTC/local date key. */
async function syncDailyQuotaLegacy(actorId: string, today: string): Promise<DailyQuotaRecord> {
  const date = new Date(`${today}T12:00:00.000Z`)
  const row = await prisma.userAITokenUsage.findFirst({
    where: { userId: actorId, date },
    select: {
      tokensUsed: true,
      requestCount: true,
      patientChatAiCount: true,
      updatedAt: true,
    },
  })

  if (row) {
    return {
      tokensUsed: row.tokensUsed,
      requestCount: row.requestCount,
      patientChatAiCount: row.patientChatAiCount ?? 0,
      lastResetDate: today,
      updatedAt: row.updatedAt,
    }
  }

  try {
    const created = await prisma.userAITokenUsage.create({
      data: {
        userId: actorId,
        date,
        tokensUsed: 0,
        requestCount: 0,
        patientChatAiCount: 0,
      },
      select: {
        tokensUsed: true,
        requestCount: true,
        patientChatAiCount: true,
        updatedAt: true,
      },
    })
    return {
      tokensUsed: 0,
      requestCount: 0,
      patientChatAiCount: 0,
      lastResetDate: today,
      updatedAt: created.updatedAt,
    }
  } catch {
    const again = await prisma.userAITokenUsage.findFirst({
      where: { userId: actorId, date },
      select: {
        tokensUsed: true,
        requestCount: true,
        patientChatAiCount: true,
        updatedAt: true,
      },
    })
    return {
      tokensUsed: again?.tokensUsed ?? 0,
      requestCount: again?.requestCount ?? 0,
      patientChatAiCount: again?.patientChatAiCount ?? 0,
      lastResetDate: today,
      updatedAt: again?.updatedAt ?? null,
    }
  }
}

function mapRecord(row: {
  tokensUsed: number
  requestCount: number
  patientChatAiCount: number
  lastResetDate: string
  updatedAt: Date
}): DailyQuotaRecord {
  return {
    tokensUsed: row.tokensUsed,
    requestCount: row.requestCount,
    patientChatAiCount: row.patientChatAiCount,
    lastResetDate: row.lastResetDate,
    updatedAt: row.updatedAt,
  }
}

export async function incrementTokenUsage(
  actorId: string,
  timeZone: string,
  totalTokens: number
): Promise<DailyQuotaRecord> {
  const quota = await syncDailyQuota(actorId, timeZone)
  const cols = await detectQuotaColumns()
  const total = Math.max(0, totalTokens)

  if (cols.lastResetDate && cols.userIdUnique) {
    const updated = await prisma.userAITokenUsage.update({
      where: { userId: actorId },
      data: {
        tokensUsed: { increment: total },
        requestCount: { increment: 1 },
      },
      select: {
        tokensUsed: true,
        requestCount: true,
        patientChatAiCount: true,
        lastResetDate: true,
        updatedAt: true,
      },
    })
    return mapRecord(updated)
  }

  const date = new Date(`${quota.lastResetDate}T12:00:00.000Z`)
  await prisma.$executeRaw`
    INSERT INTO "UserAITokenUsage" ("id", "userId", "date", "tokensUsed", "requestCount", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, ${actorId}, ${date}::date, ${total}, 1, NOW(), NOW())
    ON CONFLICT ("userId", "date") DO UPDATE SET
      "tokensUsed" = "UserAITokenUsage"."tokensUsed" + ${total},
      "requestCount" = "UserAITokenUsage"."requestCount" + 1,
      "updatedAt" = NOW()
  `
  return syncDailyQuota(actorId, timeZone)
}

export async function incrementPatientChatUsage(
  actorId: string,
  timeZone: string
): Promise<DailyQuotaRecord> {
  await syncDailyQuota(actorId, timeZone)
  const cols = await detectQuotaColumns()

  if (!cols.lastResetDate) return syncDailyQuota(actorId, timeZone)

  if (cols.userIdUnique) {
    const updated = await prisma.userAITokenUsage.update({
      where: { userId: actorId },
      data: { patientChatAiCount: { increment: 1 } },
      select: {
        tokensUsed: true,
        requestCount: true,
        patientChatAiCount: true,
        lastResetDate: true,
        updatedAt: true,
      },
    })
    return mapRecord(updated)
  }

  const today = localUsageDayKey(new Date(), timeZone)
  const date = new Date(`${today}T12:00:00.000Z`)
  await prisma.$executeRaw`
    INSERT INTO "UserAITokenUsage" (
      "id", "userId", "date", "tokensUsed", "requestCount", "patientChatAiCount", "createdAt", "updatedAt"
    )
    VALUES (gen_random_uuid()::text, ${actorId}, ${date}::date, 0, 0, 1, NOW(), NOW())
    ON CONFLICT ("userId", "date") DO UPDATE SET
      "patientChatAiCount" = "UserAITokenUsage"."patientChatAiCount" + 1,
      "updatedAt" = NOW()
  `
  return syncDailyQuota(actorId, timeZone)
}
