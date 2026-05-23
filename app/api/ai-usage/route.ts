import { NextRequest, NextResponse } from 'next/server'
import { getDailyUsageSnapshot } from '@/lib/ai/tokenUsage'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import { readAIModelForExport } from '@/lib/llm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)
  const usage = await getDailyUsageSnapshot(actor.actorId, actor.isRegistered)

  const res = NextResponse.json({
    ...usage,
    model: readAIModelForExport(),
  })
  applyActorCookie(res, actor)
  return res
}
