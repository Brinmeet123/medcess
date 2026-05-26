/** Centralized AI model and daily token limits (reset 00:00 UTC per user / guest session). */

export const DAILY_LIMIT_MESSAGE =
  'Daily AI limit reached. Your usage resets at midnight UTC.'

export const GUEST_DAILY_TOKEN_LIMIT = 20_000
export const REGISTERED_DAILY_TOKEN_LIMIT = 60_000

/** Default model id (OpenAI-compatible). Override via AI_MODEL or OPENAI_MODEL. */
export const DEFAULT_AI_MODEL = 'gpt-4o-mini'

export function readAIModel(): string {
  return (
    process.env['AI_MODEL']?.trim() ||
    process.env['OPENAI_MODEL']?.trim() ||
    DEFAULT_AI_MODEL
  )
}

export function getDailyTokenLimit(isRegistered: boolean): number {
  return isRegistered ? REGISTERED_DAILY_TOKEN_LIMIT : GUEST_DAILY_TOKEN_LIMIT
}
