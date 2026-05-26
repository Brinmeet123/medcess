/** Normalize doctor questions for flexible matching (case, punctuation, spacing). */
export function normalizeQuestion(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
}

export function uniqueQuestionWords(text: string): string[] {
  return Array.from(new Set(normalizeQuestion(text).split(' ').filter(Boolean)))
}

export function includesNormalizedPhrase(text: string, phrase: string): boolean {
  const normalized = normalizeQuestion(text)
  const np = normalizeQuestion(phrase)
  if (!np) return false
  return normalized === np || normalized.includes(np)
}

/** Word-overlap similarity 0–1 for cache matching. */
export function questionSimilarity(a: string, b: string): number {
  const wa = new Set(uniqueQuestionWords(a))
  const wb = new Set(uniqueQuestionWords(b))
  if (wa.size === 0 || wb.size === 0) return 0
  let overlap = 0
  for (const w of wa) {
    if (wb.has(w)) overlap++
  }
  return overlap / Math.max(wa.size, wb.size)
}
