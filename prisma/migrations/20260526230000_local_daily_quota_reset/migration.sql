-- Local-calendar daily quota: one row per actor, reset via lastResetDate.

ALTER TABLE "UserAITokenUsage" ADD COLUMN IF NOT EXISTS "lastResetDate" TEXT NOT NULL DEFAULT '';

UPDATE "UserAITokenUsage"
SET "lastResetDate" = to_char("date", 'YYYY-MM-DD')
WHERE ("lastResetDate" IS NULL OR "lastResetDate" = '') AND "date" IS NOT NULL;

-- Keep the most recent day row per user when consolidating duplicates.
DELETE FROM "UserAITokenUsage" u
WHERE u.id NOT IN (
  SELECT DISTINCT ON ("userId") id
  FROM "UserAITokenUsage"
  ORDER BY "userId", "date" DESC NULLS LAST, "updatedAt" DESC
);

UPDATE "UserAITokenUsage"
SET "lastResetDate" = to_char("date", 'YYYY-MM-DD')
WHERE ("lastResetDate" IS NULL OR "lastResetDate" = '') AND "date" IS NOT NULL;

DROP INDEX IF EXISTS "UserAITokenUsage_userId_date_key";

ALTER TABLE "UserAITokenUsage" DROP CONSTRAINT IF EXISTS "UserAITokenUsage_userId_date_key";

CREATE UNIQUE INDEX IF NOT EXISTS "UserAITokenUsage_userId_key" ON "UserAITokenUsage"("userId");

ALTER TABLE "UserAITokenUsage" ALTER COLUMN "date" DROP NOT NULL;

CREATE INDEX IF NOT EXISTS "UserAITokenUsage_lastResetDate_idx" ON "UserAITokenUsage"("lastResetDate");
