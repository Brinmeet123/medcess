import {
  localUsageDayKey,
  msUntilNextLocalMidnight,
  nextLocalMidnightIso,
} from '@/lib/ai/usageTimezone'
import { getClientTimezone } from '@/src/lib/aiRequestHeaders'

export { localUsageDayKey, nextLocalMidnightIso }

export function localUsageDayKeyForClient(d = new Date()): string {
  return localUsageDayKey(d, getClientTimezone())
}

export function msUntilNextLocalReset(d = new Date()): number {
  return msUntilNextLocalMidnight(d, getClientTimezone())
}
