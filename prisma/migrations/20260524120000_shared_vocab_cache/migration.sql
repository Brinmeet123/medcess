-- CreateTable
CREATE TABLE "SharedVocab" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "normalizedTerm" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "simpleDefinition" TEXT NOT NULL,
    "category" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ai_generated',
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedVocab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedVocab_normalizedTerm_key" ON "SharedVocab"("normalizedTerm");

-- CreateIndex
CREATE INDEX "SharedVocab_usageCount_idx" ON "SharedVocab"("usageCount" DESC);
