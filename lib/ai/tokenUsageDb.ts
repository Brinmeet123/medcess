import { prisma } from '@/lib/prisma'
import { utcCalendarDate } from '@/lib/ai/tokenUsage'

type UsageRow = {
  tokensUsed: number
  requestCount: number
  updatedAt: Date | null
}

function isPatientChatColumnDrift(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error)
  return msg.includes('patientChatAiCount') || msg.includes('P2022')
}

let legacyTokenSchema: boolean | null = null

async function ensureTokenSchemaMode(): Promise<void> {
  if (legacyTokenSchema !== null) return
  const rows = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'UserAITokenUsage'
        AND column_name = 'patientChatAiCount'
    ) AS "exists"
  `
  legacyTokenSchema = !rows[0]?.exists
}

function isLegacyTokenSchema(): boolean {
  return legacyTokenSchema === true
}

/** False when DB has not been migrated with patientChatAiCount yet. */
export async function isPatientChatLimitColumnAvailable(): Promise<boolean> {
  await ensureTokenSchemaMode()
  return !isLegacyTokenSchema()
}

export async function readPatientChatAiCount(
  actorId: string,
  date: Date = utcCalendarDate()
): Promise<number> {
  await ensureTokenSchemaMode()
  if (isLegacyTokenSchema()) return 0
  const rows = await prisma.$queryRaw<{ count: number }[]>`
    SELECT COALESCE("patientChatAiCount", 0)::int AS count
    FROM "UserAITokenUsage"
    WHERE "userId" = ${actorId} AND "date" = ${date}::date
    LIMIT 1
  `
  return Number(rows[0]?.count ?? 0)
}

export async function incrementPatientChatAiCount(
  actorId: string,
  date: Date = utcCalendarDate()
): Promise<void> {
  await ensureTokenSchemaMode()
  if (isLegacyTokenSchema()) return
  await prisma.$executeRaw`
    INSERT INTO "UserAITokenUsage" (
      "id", "userId", "date", "tokensUsed", "requestCount", "patientChatAiCount", "createdAt", "updatedAt"
    )
    VALUES (gen_random_uuid()::text, ${actorId}, ${date}::date, 0, 0, 1, NOW(), NOW())
    ON CONFLICT ("userId", "date") DO UPDATE SET
      "patientChatAiCount" = "UserAITokenUsage"."patientChatAiCount" + 1,
      "updatedAt" = NOW()
  `
}

/** Read daily token usage without requiring newer schema columns. */
export async function readDailyTokenUsageRow(
  actorId: string,
  date: Date = utcCalendarDate()
): Promise<UsageRow | null> {
  await ensureTokenSchemaMode()
  if (isLegacyTokenSchema()) {
    const rows = await prisma.$queryRaw<UsageRow[]>`
      SELECT "tokensUsed", "requestCount", "updatedAt"
      FROM "UserAITokenUsage"
      WHERE "userId" = ${actorId} AND "date" = ${date}::date
      LIMIT 1
    `
    return rows[0] ?? null
  }
  try {
    const row = await prisma.userAITokenUsage.findUnique({
      where: { userId_date: { userId: actorId, date } },
      select: { tokensUsed: true, requestCount: true, updatedAt: true },
    })
    return row
  } catch (error) {
    if (!isPatientChatColumnDrift(error)) throw error
    legacyTokenSchema = true
    const rows = await prisma.$queryRaw<UsageRow[]>`
      SELECT "tokensUsed", "requestCount", "updatedAt"
      FROM "UserAITokenUsage"
      WHERE "userId" = ${actorId} AND "date" = ${date}::date
      LIMIT 1
    `
    return rows[0] ?? null
  }
}

/** Increment token usage after a successful LLM call (legacy DB compatible). */
export async function incrementDailyTokenUsage(
  actorId: string,
  totalTokens: number,
  date: Date = utcCalendarDate()
): Promise<void> {
  await ensureTokenSchemaMode()
  const total = Math.max(0, totalTokens)
  if (isLegacyTokenSchema()) {
    await legacyIncrementDailyTokenUsage(actorId, total, date)
    return
  }
  try {
    await prisma.userAITokenUsage.upsert({
      where: { userId_date: { userId: actorId, date } },
      create: {
        userId: actorId,
        date,
        tokensUsed: total,
        requestCount: 1,
      },
      update: {
        tokensUsed: { increment: total },
        requestCount: { increment: 1 },
      },
    })
    legacyTokenSchema = false
    return
  } catch (error) {
    if (!isPatientChatColumnDrift(error)) throw error
    legacyTokenSchema = true
  }

  await legacyIncrementDailyTokenUsage(actorId, total, date)
}

async function legacyIncrementDailyTokenUsage(
  actorId: string,
  total: number,
  date: Date
): Promise<void> {
  await prisma.$executeRaw`
    INSERT INTO "UserAITokenUsage" ("id", "userId", "date", "tokensUsed", "requestCount", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, ${actorId}, ${date}::date, ${total}, 1, NOW(), NOW())
    ON CONFLICT ("userId", "date") DO UPDATE SET
      "tokensUsed" = "UserAITokenUsage"."tokensUsed" + ${total},
      "requestCount" = "UserAITokenUsage"."requestCount" + 1,
      "updatedAt" = NOW()
  `
}
