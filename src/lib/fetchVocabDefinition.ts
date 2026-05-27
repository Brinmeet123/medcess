import type { MedicalTermLike } from '@/src/types/medicalTerm'
import { getCachedAIDefinition, setCachedAIDefinition } from '@/src/lib/aiDefinitionCache'
import { withClientTimezone } from '@/src/lib/aiRequestHeaders'
import { notifyAiUsageUpdated } from '@/src/lib/notifyAiUsageUpdated'
import { DAILY_LIMIT_MESSAGE } from '@/lib/ai/config'

export type FetchVocabDefinitionOptions = {
  signal?: AbortSignal
  contextSentence?: string
  caseId?: string
}

export type VocabDefinitionResult = MedicalTermLike & {
  cached: boolean
  source: 'cache' | 'ai_generated' | 'demo' | 'offline'
  usageCount?: number
}

function offlineFallback(term: string, detail?: string): VocabDefinitionResult {
  const t = term.trim()
  const reason = detail
    ? ` ${detail}`
    : ' Try again when the server is available.'
  return {
    term: t,
    shortDefinition: `Could not load a definition for “${t}”.`,
    definition: `A full definition could not be loaded.${reason}`,
    category: 'general',
    isAIGenerated: true,
    cached: false,
    source: 'offline',
  }
}

/**
 * Fetches a definition from the shared vocabulary cache (DB) or AI via POST /api/vocab/define.
 */
export async function fetchVocabDefinition(
  term: string,
  options?: FetchVocabDefinitionOptions
): Promise<VocabDefinitionResult> {
  const cached = getCachedAIDefinition(term)
  if (cached) {
    return {
      ...cached,
      cached: true,
      source: 'cache',
    }
  }

  try {
    const res = await fetch('/api/vocab/define', {
      method: 'POST',
      credentials: 'same-origin',
      headers: withClientTimezone({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        term: term.trim(),
        contextSentence: options?.contextSentence,
        caseId: options?.caseId,
      }),
      signal: options?.signal,
    })

    if (res.status === 429) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      throw new Error(err.error ?? DAILY_LIMIT_MESSAGE)
    }

    const data = (await res.json().catch(() => ({}))) as VocabDefinitionResult & {
      error?: string
      details?: string
    }

    if (!res.ok) {
      if (res.status === 503) {
        throw new Error(
          data.details ?? data.error ?? 'Vocabulary AI is not configured. Set OPENAI_API_KEY on the server.'
        )
      }
      return offlineFallback(term, data.details ?? data.error)
    }

    if (data.error || !data.shortDefinition) {
      return offlineFallback(term, data.details ?? data.error)
    }

    const normalized: VocabDefinitionResult = {
      term: data.term || term.trim(),
      shortDefinition: data.shortDefinition,
      definition: data.definition || data.shortDefinition,
      category: data.category || 'general',
      isAIGenerated: data.isAIGenerated ?? data.source !== 'cache',
      cached: Boolean(data.cached),
      source: data.source ?? (data.cached ? 'cache' : 'ai_generated'),
      usageCount: data.usageCount,
    }

    if (normalized.source === 'ai_generated') {
      notifyAiUsageUpdated()
    }

    setCachedAIDefinition(term, normalized)
    return normalized
  } catch (e: unknown) {
    if (options?.signal?.aborted || (e instanceof DOMException && e.name === 'AbortError')) {
      throw e instanceof Error ? e : new DOMException('Aborted', 'AbortError')
    }
    if (e instanceof Error && e.message.includes('Daily AI limit')) {
      throw e
    }
    return offlineFallback(term)
  }
}
