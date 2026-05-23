import { NextResponse } from 'next/server'
import { DAILY_LIMIT_MESSAGE } from '@/lib/ai/config'
import { isDailyAILimitError } from '@/lib/ai/errors'

export function dailyLimitJsonResponse() {
  return NextResponse.json(
    { error: DAILY_LIMIT_MESSAGE, code: 'DAILY_AI_LIMIT' },
    { status: 429 }
  )
}

export function isDailyLimitResponse(error: unknown): boolean {
  return isDailyAILimitError(error)
}
