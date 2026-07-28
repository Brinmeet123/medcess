/** Stable id for case-vocabulary terms saved to the Practice List. */
export function caseVocabTermId(term: string): string {
  const key = term
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?'"()[\]]/g, '')
  return `case-vocab:${key}`
}
