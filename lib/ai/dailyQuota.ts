/**
 * @deprecated Use `@/lib/ai/usageTimezone` for local-midnight quotas.
 * Kept for scripts or imports that still reference UTC helpers.
 */
import { localUsageDayKey } from '@/lib/ai/usageTimezone'

export function utcUsageDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}

export function utcCalendarDate(d = new Date()): Date {
  return new Date(`${utcUsageDayKey(d)}T00:00:00.000Z`)
}

export function nextUtcResetIso(d = new Date()): string {
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1))
  return next.toISOString()
}

export { localUsageDayKey }
