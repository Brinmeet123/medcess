-- CreateTable
CREATE TABLE "UserAITokenUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "requestCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAITokenUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAITokenUsage_userId_date_key" ON "UserAITokenUsage"("userId", "date");

-- CreateIndex
CREATE INDEX "UserAITokenUsage_date_idx" ON "UserAITokenUsage"("date");

-- CreateIndex
CREATE INDEX "UserAITokenUsage_userId_idx" ON "UserAITokenUsage"("userId");
