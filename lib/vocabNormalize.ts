/** Lowercase, trim, collapse spaces, strip trailing/leading punctuation (keeps internal hyphens). */
export function normalizeVocabTerm(term: string): string {
  let s = term.trim().toLowerCase().replace(/\s+/g, ' ')
  s = s.replace(/^['"([{]+/, '').replace(/['")\]}.,;:!?]+$/, '')
  return s.trim()
}

/** Stronger normalization for lookup keys (also strips internal punctuation except hyphen). */
export function normalizeVocabTermForLookup(term: string): string {
  return normalizeVocabTerm(term).replace(/[.,;:!?'"()[\]]/g, '')
}

/** Simple singular/plural variants for shared vocabulary lookup. */
export function vocabPluralVariants(normalized: string): string[] {
  const out = new Set<string>([normalized])
  const s = normalized
  if (s.length < 3) return [...out]

  if (s.endsWith('ies') && s.length > 3) {
    out.add(s.slice(0, -3) + 'y')
  }
  if (s.endsWith('es') && s.length > 2) {
    out.add(s.slice(0, -2))
    out.add(s.slice(0, -1))
  }
  if (s.endsWith('s') && !s.endsWith('ss')) {
    out.add(s.slice(0, -1))
  }
  if (!s.endsWith('s')) {
    out.add(s + 's')
    out.add(s + 'es')
  }

  return [...out]
}

/** All normalized keys to try when looking up a term in the shared cache. */
export function sharedVocabLookupKeys(rawTerm: string): string[] {
  const base = normalizeVocabTermForLookup(rawTerm)
  if (!base) return []

  const keys = new Set<string>()
  for (const variant of vocabPluralVariants(base)) {
    const trimmed = variant.trim()
    if (trimmed) keys.add(trimmed)
  }
  return [...keys]
}
