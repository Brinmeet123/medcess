import { NextRequest, NextResponse } from 'next/server'
import { getDailyUsageSnapshot } from '@/lib/ai/tokenUsage'
import { getDailyPatientChatLimitForActor } from '@/lib/ai/patientChatLimits'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import { readAIModelForExport } from '@/lib/llm'
import { readPatientChatAiCount } from '@/lib/ai/patientChatLimits'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)
  const usage = await getDailyUsageSnapshot(actor.actorId, actor.timezone)
  const patientChatAiLimit = getDailyPatientChatLimitForActor(actor.actorId)
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
}
