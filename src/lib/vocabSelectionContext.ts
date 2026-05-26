'use client'

export type SelectionMode = 'vocab' | 'simplify'

export type SelectionContext = {
  contextSentence?: string
  caseId?: string
  mode: SelectionMode
  source?: string
}

const SIMPLIFY_SOURCES = new Set(['debrief', 'summary'])
const RESULT_CONTEXT_SELECTOR =
  '[data-highlight-context="result"], [data-vocab-mode="simplify"], [data-highlight-mode="simplify"], .test-result, .debrief, .score-feedback, .results-section, .vocab-simplify-block'

function elementFromNode(node: Node | null): Element | null {
  if (!node) return null
  if (node.nodeType === Node.TEXT_NODE) return (node as Text).parentElement
  return node instanceof Element ? node : null
}

function isResultContext(range: Range, fallbackEl: Element | null): boolean {
  const common = fallbackEl
  const startEl = elementFromNode(range.startContainer)
  const endEl = elementFromNode(range.endContainer)
  return Boolean(
    common?.closest(RESULT_CONTEXT_SELECTOR) ||
      startEl?.closest(RESULT_CONTEXT_SELECTOR) ||
      endEl?.closest(RESULT_CONTEXT_SELECTOR)
  )
}

function wordCount(raw: string): number {
  const t = raw.trim()
  if (!t) return 0
  return t.split(/\s+/).filter(Boolean).length
}

/** Extract context and mode from a text selection for vocabulary or result explanation. */
export function getSelectionContextFromRange(range: Range): SelectionContext {
  const node = range.commonAncestorContainer
  const element =
    node.nodeType === Node.TEXT_NODE
      ? node.parentElement
      : node instanceof Element
        ? node
        : null

  const block = element?.closest('.vocab-context-block')
  const modeEl = element?.closest('[data-vocab-mode]')
  const modeAttr = modeEl?.getAttribute('data-vocab-mode')?.trim()
  const source = block?.getAttribute('data-vocab-source')?.trim() || undefined

  const selected = range.toString().trim()
  const selectionWords = wordCount(selected)
  const inResultContext = isResultContext(range, element)

  let mode: SelectionMode = 'vocab'
  if (inResultContext) {
    mode = 'simplify'
  } else if (modeAttr === 'simplify') {
    mode = 'simplify'
  } else if (source && SIMPLIFY_SOURCES.has(source)) {
    mode = 'simplify'
  } else if (selectionWords > 3) {
    mode = 'simplify'
  }

  const caseId = block?.getAttribute('data-vocab-scenario-id')?.trim() || undefined
  const blockText = block?.getAttribute('data-vocab-text')?.trim()
  const sourceText = blockText || getReadableBlockText(element as HTMLElement | null) || ''
  const contextSentence = extractSentenceAround(sourceText, selected)

  return {
    contextSentence: contextSentence || undefined,
    caseId: caseId || undefined,
    mode,
    source,
  }
}

/** @deprecated Use getSelectionContextFromRange */
export function getVocabContextFromRange(range: Range): {
  contextSentence?: string
  caseId?: string
} {
  const ctx = getSelectionContextFromRange(range)
  return { contextSentence: ctx.contextSentence, caseId: ctx.caseId }
}

function getReadableBlockText(element: HTMLElement | null): string {
  if (!element) return ''
  const container =
    element.closest('main') ??
    element.closest('[data-vocab-text]') ??
    element.closest('article, section, .case-panel') ??
    element
  if (!(container instanceof HTMLElement)) return element.textContent || ''
  const clone = container.cloneNode(true) as HTMLElement
  clone.querySelectorAll('script, style, noscript').forEach((el) => el.remove())
  return clone.textContent || ''
}

function extractSentenceAround(text: string, needle: string): string | undefined {
  const trimmed = text.trim()
  const term = needle.trim()
  if (!trimmed || !term) return undefined

  const idx = trimmed.toLowerCase().indexOf(term.toLowerCase())
  if (idx === -1) {
    return trimmed.length <= 320 ? trimmed : `${trimmed.slice(0, 300)}…`
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
  if (sentence.length <= 400) return sentence
  return `${sentence.slice(0, 397)}…`
}

export function isSelectionValidForMode(raw: string, mode: SelectionMode): boolean {
  const t = raw.trim()
  if (!/[\p{L}\p{N}]/u.test(t)) return false

  if (mode === 'simplify') {
    if (t.length < 3) return false
    if (t.length > 400) return false
    return true
  }

  if (t.length < 2) return false
  if (t.length > 80) return false
  const letters = t.replace(/[\s\p{P}]/gu, '')
  if (letters.length < 2) return false
  return true
}
