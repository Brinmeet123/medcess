/** Client IANA timezone header sent on AI API requests. */
export const CLIENT_TIMEZONE_HEADER = 'x-client-timezone'

const FALLBACK_TIMEZONE = 'UTC'

/** Validate and normalize an IANA timezone string. */
export function normalizeUsageTimezone(tz: string | null | undefined): string {
  const trimmed = tz?.trim()
  if (!trimmed || trimmed.length > 64) return FALLBACK_TIMEZONE
  try {
    Intl.DateTimeFormat(undefined, { timeZone: trimmed })
    return trimmed
  } catch {
    return FALLBACK_TIMEZONE
  }
}

/** Local calendar day `YYYY-MM-DD` for the given timezone (not UTC). */
export function localUsageDayKey(now = new Date(), timeZone: string = FALLBACK_TIMEZONE): string {
  const tz = normalizeUsageTimezone(timeZone)
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** ISO time of the next local midnight in the given timezone. */
export function nextLocalMidnightIso(now = new Date(), timeZone: string = FALLBACK_TIMEZONE): string {
  const tz = normalizeUsageTimezone(timeZone)
  const today = localUsageDayKey(now, tz)
  let probe = now.getTime() + 60_000
  const end = probe + 48 * 60 * 60 * 1000
  while (probe < end) {
    if (localUsageDayKey(new Date(probe), tz) !== today) {
      return new Date(probe).toISOString()
    }
    probe += 60_000
  }
  return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
}

export function msUntilNextLocalMidnight(now = new Date(), timeZone: string = FALLBACK_TIMEZONE): number {
  const next = new Date(nextLocalMidnightIso(now, timeZone)).getTime()
  return Math.max(1_000, next - now.getTime())
}
