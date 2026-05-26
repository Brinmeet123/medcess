-- AlterTable
ALTER TABLE "UserAITokenUsage" ADD COLUMN IF NOT EXISTS "patientChatAiCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE IF NOT EXISTS "PatientLearnedResponse" (
    "id" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "normalizedQuestion" TEXT NOT NULL,
    "keywords" TEXT[],
    "response" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'ai_generated',
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientLearnedResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "PatientLearnedResponse_scenarioId_normalizedQuestion_key" ON "PatientLearnedResponse"("scenarioId", "normalizedQuestion");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PatientLearnedResponse_scenarioId_idx" ON "PatientLearnedResponse"("scenarioId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PatientLearnedResponse_usageCount_idx" ON "PatientLearnedResponse"("usageCount" DESC);
