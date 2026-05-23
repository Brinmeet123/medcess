import { DAILY_LIMIT_MESSAGE } from '@/lib/ai/config'

export class DailyAILimitError extends Error {
  readonly code = 'DAILY_AI_LIMIT'
  readonly status = 429

  constructor(message: string = DAILY_LIMIT_MESSAGE) {
    super(message)
    this.name = 'DailyAILimitError'
  }
}

export function isDailyAILimitError(error: unknown): error is DailyAILimitError {
  return error instanceof DailyAILimitError
}
