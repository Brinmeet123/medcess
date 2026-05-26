/**
 * Daily AI quotas are tracked per actor (registered user id or `guest:<session>`)
 * and per UTC calendar day. A new DB row is used each day, so usage resets at 00:00 UTC.
 */

/** UTC calendar day key `YYYY-MM-DD` used for usage buckets. */
export function utcUsageDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}

/** Midnight UTC at the start of the given day (for Prisma @db.Date). */
export function utcCalendarDate(d = new Date()): Date {
  return new Date(`${utcUsageDayKey(d)}T00:00:00.000Z`)
}

/** ISO timestamp when the current UTC usage day ends (next reset). */
export function nextUtcResetIso(d = new Date()): string {
  const next = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0, 0)
  )
  return next.toISOString()
}

export function msUntilNextUtcReset(d = new Date()): number {
  const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1)
  return Math.max(1_000, next - d.getTime())
}
