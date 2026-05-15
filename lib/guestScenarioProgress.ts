import type { ScenarioProgressInfo } from '@/components/ScenarioList'

const STORAGE_KEY = 'vd_guest_scenario_progress_v1'

export type GuestProgressRow = {
  status: 'completed' | 'in_progress'
  bestScore: number | null
  lastAttemptScore: number | null
  updatedAt: number
}

export type GuestProgressStore = Record<string, GuestProgressRow>

function safeParse(raw: string | null): GuestProgressStore {
  if (!raw) return {}
  try {
    const v = JSON.parse(raw) as unknown
    if (!v || typeof v !== 'object') return {}
    return v as GuestProgressStore
  } catch {
    return {}
  }
}

export function readGuestScenarioProgress(): GuestProgressStore {
  if (typeof window === 'undefined') return {}
  return safeParse(localStorage.getItem(STORAGE_KEY))
}

export function guestProgressToScenarioMap(store: GuestProgressStore): Record<string, ScenarioProgressInfo> {
  const out: Record<string, ScenarioProgressInfo> = {}
  for (const [id, row] of Object.entries(store)) {
    out[id] = {
      status: row.status === 'completed' ? 'completed' : 'in_progress',
      bestScore: row.bestScore,
      lastAttemptScore: row.lastAttemptScore,
    }
  }
  return out
}

export function recordGuestScenarioCompletion(scenarioId: string, score: number): void {
  if (typeof window === 'undefined') return
  const prev = readGuestScenarioProgress()
  const prior = prev[scenarioId]
  const bestScore = prior?.bestScore != null ? Math.max(prior.bestScore, score) : score
  const next: GuestProgressStore = {
    ...prev,
    [scenarioId]: {
      status: 'completed',
      bestScore,
      lastAttemptScore: score,
      updatedAt: Date.now(),
    },
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('guest-scenario-progress'))
}
