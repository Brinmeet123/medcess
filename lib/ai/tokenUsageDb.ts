import { prisma } from '@/lib/prisma'

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

/** False when DB has not been migrated with patientChatAiCount yet. */
export async function isPatientChatLimitColumnAvailable(): Promise<boolean> {
  await ensureTokenSchemaMode()
  return legacyTokenSchema !== true
}
