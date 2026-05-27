import { NextRequest, NextResponse } from 'next/server'
import {
  getDailyTokenLimitForActor,
  isRegisteredActorId,
} from '@/lib/ai/config'
import { getDailyUsageSnapshot } from '@/lib/ai/tokenUsage'
import {
  getDailyPatientChatLimitForActor,
  readPatientChatAiCount,
} from '@/lib/ai/patientChatLimits'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import { readAIModelForExport } from '@/lib/llm'
import { localUsageDayKey, nextLocalMidnightIso } from '@/lib/ai/usageTimezone'

export const dynamic = 'force-dynamic'

function fallbackUsagePayload(
  actorId: string,
  timeZone: string,
  patientChatAiLimit: number
) {
  const isRegistered = isRegisteredActorId(actorId)
  const dailyLimit = getDailyTokenLimitForActor(actorId)
  const date = localUsageDayKey(new Date(), timeZone)
  return {
    actorId,
    isRegistered,
    date,
    lastResetDate: date,
    dailyUsageCount: 0,
    tokensUsed: 0,
    requestCount: 0,
    dailyLimit,
    percentUsed: 0,
    lastUpdatedAt: null,
    resetsAt: nextLocalMidnightIso(new Date(), timeZone),
    timezone: timeZone,
    model: readAIModelForExport(),
    patientChatAiUsed: 0,
    patientChatAiLimit,
    patientChatAiPercentUsed: 0,
  }
}

export async function GET(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)
  const patientChatAiLimit = getDailyPatientChatLimitForActor(actor.actorId)

  try {
    const usage = await getDailyUsageSnapshot(actor.actorId, actor.timezone)
    const patientChatAiUsed = await readPatientChatAiCount(actor.actorId, actor.timezone)

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
  } catch (error) {
    console.error('[api/ai-usage]', error)
    const res = NextResponse.json(
      fallbackUsagePayload(actor.actorId, actor.timezone, patientChatAiLimit)
    )
    applyActorCookie(res, actor)
    return res
  }
}
