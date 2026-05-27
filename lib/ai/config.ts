/** Centralized AI model and daily token limits (reset at local midnight per user / guest session). */

export const DAILY_LIMIT_MESSAGE =
  'Daily AI limit reached. Daily AI limit resets at midnight.'

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

export function isGuestActorId(actorId: string): boolean {
  return actorId.startsWith('guest:')
}

export function isRegisteredActorId(actorId: string): boolean {
  return !isGuestActorId(actorId)
}

export function getDailyTokenLimit(isRegistered: boolean): number {
  return isRegistered ? REGISTERED_DAILY_TOKEN_LIMIT : GUEST_DAILY_TOKEN_LIMIT
}

/** Token limit from actor id (registered user ids → 60k; guest sessions → 20k). */
export function getDailyTokenLimitForActor(actorId: string): number {
  return getDailyTokenLimit(isRegisteredActorId(actorId))
}
