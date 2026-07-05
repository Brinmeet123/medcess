import type { Scenario } from '@/data/scenarios'

/** Whether this case uses the MEDacademy case type. */
export function isMedacademyCase(scenario: Pick<Scenario, 'caseType' | 'sectionLayout'>): boolean {
  if (scenario.caseType === 'MEDacademy') return true
  // Legacy: sectionLayout medacademy implies MEDacademy until all cases migrate to caseType
  return scenario.sectionLayout === 'medacademy'
}

/**
 * Vocab tab is shown only for MEDacademy cases with an explicit opt-in.
 * Debrief vocabTerms or caseVocab alone never enable the tab.
 */
export function shouldShowVocabTab(
  scenario: Pick<Scenario, 'caseType' | 'sectionLayout' | 'showVocabTab' | 'caseVocab'>
): boolean {
  if (scenario.showVocabTab !== true) return false
  if (!isMedacademyCase(scenario)) return false
  return Boolean(scenario.caseVocab?.length)
}

export function caseVocabTermId(term: string): string {
  const key = term
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?'"()[\]]/g, '')
  return `case-vocab:${key}`
}
