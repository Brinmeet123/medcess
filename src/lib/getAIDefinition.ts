import type { MedicalTermLike } from '@/src/types/medicalTerm'
import { fetchVocabDefinition, type FetchVocabDefinitionOptions } from '@/src/lib/fetchVocabDefinition'

export type GetAIDefinitionOptions = FetchVocabDefinitionOptions

/**
 * Fetches a definition for a term not in the local dataset.
 * Uses the shared vocabulary cache (PostgreSQL) before calling AI.
 */
export async function getAIDefinition(
  term: string,
  options?: GetAIDefinitionOptions
): Promise<MedicalTermLike> {
  const result = await fetchVocabDefinition(term, options)
  return {
    term: result.term,
    shortDefinition: result.shortDefinition,
    definition: result.definition,
    category: result.category,
    isAIGenerated: result.isAIGenerated,
  }
}

export { fetchVocabDefinition }
