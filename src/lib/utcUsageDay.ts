/** Client-safe UTC usage day helpers (no server imports). */

export function utcUsageDayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}

export function msUntilNextUtcReset(d = new Date()): number {
  const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1)
  return Math.max(1_000, next - d.getTime())
}
