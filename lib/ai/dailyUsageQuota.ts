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
  patientChatAiCount: boolean
}

let quotaColumns: QuotaColumns | null = null

async function detectQuotaColumns(): Promise<QuotaColumns> {
  if (quotaColumns) return quotaColumns
  const rows = await prisma.$queryRaw<
    { lastResetDate: boolean; userIdUnique: boolean; patientChatAiCount: boolean }[]
  >`
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
      ) AS "userIdUnique",
      EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'UserAITokenUsage'
          AND column_name = 'patientChatAiCount'
      ) AS "patientChatAiCount"
  `
  quotaColumns = {
    lastResetDate: Boolean(rows[0]?.lastResetDate),
    userIdUnique: Boolean(rows[0]?.userIdUnique),
    patientChatAiCount: Boolean(rows[0]?.patientChatAiCount),
  }
  return quotaColumns
}

function canUseModernQuotaSchema(cols: QuotaColumns): boolean {
  return cols.lastResetDate && cols.userIdUnique && cols.patientChatAiCount
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

  if (canUseModernQuotaSchema(cols)) {
    try {
      return await syncDailyQuotaModern(actorId, today)
    } catch (error) {
      console.warn('[dailyUsageQuota] modern sync failed, falling back to legacy:', error)
    }
  }

  return syncDailyQuotaLegacy(actorId, today, cols)
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
        date: new Date(`${today}T12:00:00.000Z`),
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

type LegacyUsageRow = {
  tokensUsed: number
  requestCount: number
  updatedAt: Date | null
  patientChatAiCount: number
}

async function readLegacyUsageRow(
  actorId: string,
  date: Date,
  cols: QuotaColumns
): Promise<LegacyUsageRow | null> {
  if (cols.patientChatAiCount) {
    const rows = await prisma.$queryRaw<
      { tokensUsed: number; requestCount: number; updatedAt: Date; patientChatAiCount: number }[]
    >`
      SELECT "tokensUsed", "requestCount", "updatedAt",
        COALESCE("patientChatAiCount", 0)::int AS "patientChatAiCount"
      FROM "UserAITokenUsage"
      WHERE "userId" = ${actorId} AND "date" = ${date}::date
      LIMIT 1
    `
    const row = rows[0]
    if (!row) return null
    return {
      tokensUsed: row.tokensUsed,
      requestCount: row.requestCount,
      updatedAt: row.updatedAt,
      patientChatAiCount: row.patientChatAiCount,
    }
  }

  const rows = await prisma.$queryRaw<
    { tokensUsed: number; requestCount: number; updatedAt: Date }[]
  >`
    SELECT "tokensUsed", "requestCount", "updatedAt"
    FROM "UserAITokenUsage"
    WHERE "userId" = ${actorId} AND "date" = ${date}::date
    LIMIT 1
  `
  const row = rows[0]
  if (!row) return null
  return {
    tokensUsed: row.tokensUsed,
    requestCount: row.requestCount,
    updatedAt: row.updatedAt,
    patientChatAiCount: 0,
  }
}

/** Pre-migration / partial migration: one row per calendar date key. */
async function syncDailyQuotaLegacy(
  actorId: string,
  today: string,
  cols: QuotaColumns
): Promise<DailyQuotaRecord> {
  const date = new Date(`${today}T12:00:00.000Z`)
  const row = await readLegacyUsageRow(actorId, date, cols)

  if (row) {
    return {
      tokensUsed: row.tokensUsed,
      requestCount: row.requestCount,
      patientChatAiCount: row.patientChatAiCount,
      lastResetDate: today,
      updatedAt: row.updatedAt,
    }
  }

  try {
    if (cols.patientChatAiCount) {
      await prisma.$executeRaw`
        INSERT INTO "UserAITokenUsage" (
          "id", "userId", "date", "tokensUsed", "requestCount", "patientChatAiCount", "createdAt", "updatedAt"
        )
        VALUES (gen_random_uuid()::text, ${actorId}, ${date}::date, 0, 0, 0, NOW(), NOW())
        ON CONFLICT ("userId", "date") DO NOTHING
      `
    } else {
      await prisma.$executeRaw`
        INSERT INTO "UserAITokenUsage" (
          "id", "userId", "date", "tokensUsed", "requestCount", "createdAt", "updatedAt"
        )
        VALUES (gen_random_uuid()::text, ${actorId}, ${date}::date, 0, 0, NOW(), NOW())
        ON CONFLICT ("userId", "date") DO NOTHING
      `
    }
  } catch {
    /* race: row created concurrently */
  }

  const again = await readLegacyUsageRow(actorId, date, cols)
  return {
    tokensUsed: again?.tokensUsed ?? 0,
    requestCount: again?.requestCount ?? 0,
    patientChatAiCount: again?.patientChatAiCount ?? 0,
    lastResetDate: today,
    updatedAt: again?.updatedAt ?? null,
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

  if (canUseModernQuotaSchema(cols)) {
    try {
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
    } catch (error) {
      console.warn('[dailyUsageQuota] modern token increment failed, using legacy:', error)
    }
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

  if (!cols.patientChatAiCount) {
    return syncDailyQuota(actorId, timeZone)
  }

  if (canUseModernQuotaSchema(cols)) {
    try {
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
    } catch (error) {
      console.warn('[dailyUsageQuota] modern patient-chat increment failed, using legacy:', error)
    }
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
