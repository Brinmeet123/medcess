/** Canonical IDs for the original starter scenarios — always guest-playable, pinned first in the library. */
export const FREE_CASE_IDS = [
  'chest-pain-er',
  'sudden-headache-er',
  'acute-sob-er',
  'rlq-abdominal-pain',
  'fever-confusion',
] as const

export type FreeCaseId = (typeof FREE_CASE_IDS)[number]

const FREE_SET = new Set<string>(FREE_CASE_IDS)

export function isGuestAccessible(caseId: string): boolean {
  return FREE_SET.has(caseId)
}

/** Guest/free cases first (fixed order), then the rest in `remaining` order. */
export function orderWithFreeCasesFirst<T extends { id: string }>(items: T[]): { free: T[]; locked: T[] } {
  const inList = new Map(items.map((s) => [s.id, s]))
  const free: T[] = []
  for (const id of FREE_CASE_IDS) {
    const s = inList.get(id)
    if (s) free.push(s)
  }
  const freeIds = new Set(free.map((s) => s.id))
  const locked = items.filter((s) => !freeIds.has(s.id))
  return { free, locked }
}
