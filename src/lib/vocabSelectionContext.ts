'use client'

/** Extract a context sentence and case id from a text selection for vocabulary lookup. */
export function getVocabContextFromRange(range: Range): {
  contextSentence?: string
  caseId?: string
} {
  const node = range.commonAncestorContainer
  const element =
    node.nodeType === Node.TEXT_NODE
      ? node.parentElement
      : node instanceof Element
        ? node
        : null

  const block = element?.closest('.vocab-context-block')
  const caseId = block?.getAttribute('data-vocab-scenario-id')?.trim() || undefined
  const blockText = block?.getAttribute('data-vocab-text')?.trim()

  const selected = range.toString().trim()
  const sourceText = blockText || element?.textContent || ''
  const contextSentence = extractSentenceAround(sourceText, selected)

  return {
    contextSentence: contextSentence || undefined,
    caseId: caseId || undefined,
  }
}

function extractSentenceAround(text: string, needle: string): string | undefined {
  const trimmed = text.trim()
  const term = needle.trim()
  if (!trimmed || !term) return undefined

  const idx = trimmed.toLowerCase().indexOf(term.toLowerCase())
  if (idx === -1) {
    return trimmed.length <= 240 ? trimmed : `${trimmed.slice(0, 200)}…`
  }

  const before = trimmed.slice(0, idx)
  const after = trimmed.slice(idx + term.length)

  const start =
    Math.max(
      before.lastIndexOf('. '),
      before.lastIndexOf('! '),
      before.lastIndexOf('? '),
      before.lastIndexOf('\n')
    ) + (before.match(/[.!?\n]\s*$/) ? 2 : 1)

  const endOffset = (() => {
    const rel = after.search(/[.!?](?:\s|$|\n)/)
    return rel === -1 ? after.length : rel + 1
  })()

  const sentence = `${before.slice(Math.max(0, start))}${term}${after.slice(0, endOffset)}`.trim()
  if (sentence.length <= 280) return sentence
  return `${sentence.slice(0, 277)}…`
}
