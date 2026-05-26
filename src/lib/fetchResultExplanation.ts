export type FetchResultExplanationOptions = {
  signal?: AbortSignal
  contextSentence?: string
  caseId?: string
  source?: string
}

export type ResultExplanationResponse = {
  explanation: string
  source: 'ai' | 'demo' | 'offline'
}

function offlineFallback(selectedText: string): ResultExplanationResponse {
  return {
    explanation: `This feedback mentions “${selectedText.slice(0, 80)}”. In plain terms, it describes something about your case performance or a test finding. Try again when the server is available for a simpler explanation.`,
    source: 'offline',
  }
}

/**
 * Simplify highlighted result/debrief text for students. Does not use the vocab database.
 */
export async function fetchResultExplanation(
  selectedText: string,
  options?: FetchResultExplanationOptions
): Promise<ResultExplanationResponse> {
  try {
    const res = await fetch('/api/explain-result', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selectedText: selectedText.trim(),
        contextSentence: options?.contextSentence,
        caseId: options?.caseId,
        source: options?.source,
      }),
      signal: options?.signal,
    })

    if (res.status === 429) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      throw new Error(err.error ?? 'Daily AI limit reached. Your usage resets tomorrow.')
    }

    if (!res.ok) {
      return offlineFallback(selectedText)
    }

    const data = (await res.json()) as ResultExplanationResponse & { error?: string }
    if (data.error || !data.explanation?.trim()) {
      return offlineFallback(selectedText)
    }

    return {
      explanation: data.explanation.trim(),
      source: data.source ?? 'ai',
    }
  } catch (e: unknown) {
    if (options?.signal?.aborted || (e instanceof DOMException && e.name === 'AbortError')) {
      throw e instanceof Error ? e : new DOMException('Aborted', 'AbortError')
    }
    if (e instanceof Error && e.message.includes('Daily AI limit')) {
      throw e
    }
    return offlineFallback(selectedText)
  }
}
