import { CLIENT_TIMEZONE_HEADER, normalizeUsageTimezone } from '@/lib/ai/usageTimezone'

export function getClientTimezone(): string {
  try {
    return normalizeUsageTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  } catch {
    return 'UTC'
  }
}

/** Merge client timezone into fetch headers for AI quota routes. */
export function withClientTimezone(headers?: HeadersInit): HeadersInit {
  const merged = new Headers(headers)
  merged.set(CLIENT_TIMEZONE_HEADER, getClientTimezone())
  return merged
}
