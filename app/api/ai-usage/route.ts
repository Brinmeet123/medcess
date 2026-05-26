import { NextRequest, NextResponse } from 'next/server'
import { getDailyUsageSnapshot } from '@/lib/ai/tokenUsage'
import { getDailyPatientChatLimit } from '@/lib/ai/patientChatLimits'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import { readAIModelForExport } from '@/lib/llm'
import { prisma } from '@/lib/prisma'
import { utcCalendarDate } from '@/lib/ai/tokenUsage'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)
  const usage = await getDailyUsageSnapshot(actor.actorId, actor.isRegistered)
  let patientChatAiUsed = 0
  const patientChatAiLimit = getDailyPatientChatLimit(actor.isRegistered)
  try {
    const date = utcCalendarDate()
    const row = await prisma.userAITokenUsage.findUnique({
      where: { userId_date: { userId: actor.actorId, date } },
    })
    patientChatAiUsed = row?.patientChatAiCount ?? 0
  } catch {
    /* column/table may be missing before migration — token usage still works */
  }

  const res = NextResponse.json({
    ...usage,
    model: readAIModelForExport(),
    patientChatAiUsed,
    patientChatAiLimit,
    patientChatAiPercentUsed:
      patientChatAiLimit > 0
        ? Math.min(100, Math.round((patientChatAiUsed / patientChatAiLimit) * 100))
        : 0,
  })
  applyActorCookie(res, actor)
  return res
}
