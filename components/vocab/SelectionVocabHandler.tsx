'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { MedicalTerm } from '@/src/types/medicalTerm'
import { lookupMedicalTerm, normalizeLookupKey } from '@/src/lib/medicalTerms'
import { fetchVocabDefinition } from '@/src/lib/fetchVocabDefinition'
import { fetchResultExplanation } from '@/src/lib/fetchResultExplanation'
import { medicalTermLikeToMedicalTerm } from '@/src/lib/aiTermToMedicalTerm'
import { getScrollableAncestors } from '@/src/lib/scrollAnchor'
import {
  getSelectionContextFromRange,
  isSelectionValidForMode,
  type SelectionMode,
} from '@/src/lib/vocabSelectionContext'
import MedicalTermPopover from '@/components/vocab/MedicalTermPopover'
import { useVocabStore } from '@/lib/useVocabStore'
import { isPlaceholderVocabDefinition } from '@/src/lib/vocabDefinitionQuality'

function isFormFieldFocused(): boolean {
  const el = document.activeElement
  if (!el || !(el instanceof HTMLElement)) return false
  const tag = el.tagName.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
  if (el.isContentEditable) return true
  return Boolean(el.closest('input, textarea, select, [contenteditable="true"]'))
}

function isInsideInput(node: Node | null): boolean {
  if (!node) return false
  if (node.nodeType === Node.TEXT_NODE) {
    return isInsideInput(node.parentElement)
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement
    const tag = element.tagName?.toLowerCase()
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
    if (element.isContentEditable) return true
    if (element.closest('input, textarea, select, [contenteditable="true"]')) return true
  }
  return false
}

function isInsidePopover(node: Node | null): boolean {
  if (!node) return false
  const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element)
  return Boolean(el?.closest('[data-vocab-popover]'))
}

function isAIGeneratedTerm(term: MedicalTerm | null): boolean {
  if (!term) return false
  return term.id.startsWith('ai:')
}

export default function SelectionVocabHandler() {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('vocab')
  const [medicalTerm, setMedicalTerm] = useState<MedicalTerm | null>(null)
  const [simplifyExplanation, setSimplifyExplanation] = useState<string | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [fromCache, setFromCache] = useState(false)

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rangeRef = useRef<Range | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const { saveMedicalTerm, hasTermId, isLoaded, canSave: sessionCanSave } = useVocabStore()
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleClose = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setSelectedText(null)
    setSelectionPosition(null)
    setSelectionMode('vocab')
    setMedicalTerm(null)
    setSimplifyExplanation(null)
    setIsLoadingAI(false)
    setAiError(null)
    setFromCache(false)
    setSaveError(null)
    setIsSaving(false)
    rangeRef.current = null
    window.getSelection()?.removeAllRanges()
  }, [])

  const updatePositionFromRange = useCallback(() => {
    const r = rangeRef.current
    if (!r) return
    try {
      const rect = r.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        handleClose()
        return
      }
      const vh = window.innerHeight
      if (rect.bottom < -100 || rect.top > vh + 100) {
        handleClose()
        return
      }
      setSelectionPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      })
    } catch {
      handleClose()
    }
  }, [handleClose])

  const handleSelection = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)

    debounceTimerRef.current = setTimeout(() => {
      if (isFormFieldFocused()) {
        return
      }

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        handleClose()
        return
      }

      const range = selection.getRangeAt(0)
      if (isInsideInput(range.commonAncestorContainer) || isInsidePopover(range.commonAncestorContainer)) {
        handleClose()
        return
      }

      const raw = selection.toString()
      const ctx = getSelectionContextFromRange(range)
      if (!isSelectionValidForMode(raw, ctx.mode)) {
        handleClose()
        return
      }

      const trimmed = raw.trim()
      const lookupKey = normalizeLookupKey(raw)
      abortRef.current?.abort()
      abortRef.current = null

      try {
        rangeRef.current = range.cloneRange()
      } catch {
        handleClose()
        return
      }

      const rect = range.getBoundingClientRect()
      setSelectionPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      })
      setSelectedText(trimmed)
      setSelectionMode(ctx.mode)
      setAiError(null)
      setSimplifyExplanation(null)
      setMedicalTerm(null)
      setFromCache(false)

      if (ctx.mode === 'simplify') {
        setIsLoadingAI(true)
        const ac = new AbortController()
        abortRef.current = ac

        fetchResultExplanation(trimmed, {
          signal: ac.signal,
          contextSentence: ctx.contextSentence,
          caseId: ctx.caseId,
          source: ctx.source,
        })
          .then((result) => {
            if (ac.signal.aborted) return
            setSimplifyExplanation(result.explanation)
            setIsLoadingAI(false)
            setAiError(null)
          })
          .catch((e: unknown) => {
            if (e instanceof DOMException && e.name === 'AbortError') return
            setIsLoadingAI(false)
            setAiError(e instanceof Error ? e.message : 'Could not simplify this text.')
          })
        return
      }

      const local = lookupMedicalTerm(lookupKey)
      if (local) {
        setMedicalTerm(local)
        setIsLoadingAI(false)
        return
      }

      setIsLoadingAI(true)
      const ac = new AbortController()
      abortRef.current = ac

      fetchVocabDefinition(lookupKey, {
        signal: ac.signal,
        contextSentence: ctx.contextSentence,
        caseId: ctx.caseId,
      })
        .then((result) => {
          if (ac.signal.aborted) return
          const nk = lookupKey.trim().toLowerCase().replace(/\s+/g, ' ')
          setMedicalTerm(medicalTermLikeToMedicalTerm(result, nk))
          setFromCache(result.cached)
          setIsLoadingAI(false)
          setAiError(null)
        })
        .catch((e: unknown) => {
          if (e instanceof DOMException && e.name === 'AbortError') return
          setIsLoadingAI(false)
          setAiError(e instanceof Error ? e.message : 'Could not load definition.')
        })
    }, 280)
  }, [handleClose])

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection)
    return () => {
      document.removeEventListener('selectionchange', handleSelection)
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [handleSelection])

  useEffect(() => {
    if (!selectedText || !rangeRef.current) return

    let raf = 0
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => updatePositionFromRange())
    }

    const onScrollOrResize = () => schedule()

    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    window.visualViewport?.addEventListener('resize', onScrollOrResize)
    window.visualViewport?.addEventListener('scroll', onScrollOrResize)

    const scrollEls = getScrollableAncestors(rangeRef.current.commonAncestorContainer)
    scrollEls.forEach((el) => el.addEventListener('scroll', onScrollOrResize, { passive: true }))

    schedule()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
      window.visualViewport?.removeEventListener('resize', onScrollOrResize)
      window.visualViewport?.removeEventListener('scroll', onScrollOrResize)
      scrollEls.forEach((el) => el.removeEventListener('scroll', onScrollOrResize))
    }
  }, [selectedText, updatePositionFromRange])

  /** Prevent accidental button/link activation after the user selected text. */
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed) return
      const text = sel.toString().trim()
      if (text.length < 2) return

      const target = e.target
      if (!(target instanceof HTMLElement)) return
      if (target.closest('[data-vocab-popover]')) return

      const interactive = target.closest('button, a, [role="button"], [role="tab"]')
      if (interactive) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener('click', onClickCapture, true)
    return () => document.removeEventListener('click', onClickCapture, true)
  }, [])

  const handleSave = async () => {
    if (selectionMode !== 'vocab' || !medicalTerm || !isLoaded || isLoadingAI) return
    setSaveError(null)
    setIsSaving(true)
    try {
      const ok = await saveMedicalTerm(medicalTerm)
      if (!ok) {
        setSaveError('Sign in to save vocabulary to your account.')
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (!selectedText || !selectionPosition) return null

  const definitionText = medicalTerm
    ? medicalTerm.shortDefinition || medicalTerm.definition
    : ''
  const definitionIsPlaceholder = isPlaceholderVocabDefinition(definitionText)
  const canSave =
    selectionMode === 'vocab' &&
    Boolean(medicalTerm) &&
    !isLoadingAI &&
    !aiError &&
    !definitionIsPlaceholder &&
    sessionCanSave
  const saved = medicalTerm ? hasTermId(medicalTerm.id) : false
  const combinedError =
    saveError ??
    aiError ??
    (selectionMode === 'vocab' && definitionIsPlaceholder && medicalTerm
      ? 'A real definition is required to save. Set OPENAI_API_KEY in .env.local (and redeploy on Vercel), or turn off DEMO_MODE.'
      : null)

  return (
    <MedicalTermPopover
      mode={selectionMode === 'simplify' ? 'simplify' : 'definition'}
      medicalTerm={medicalTerm}
      simplifyExplanation={simplifyExplanation}
      selectedText={selectedText}
      position={selectionPosition}
      onClose={handleClose}
      onSave={handleSave}
      isSaved={saved}
      isSaving={isSaving}
      canSave={canSave}
      isLoading={isLoadingAI}
      isAIGenerated={isAIGeneratedTerm(medicalTerm) && !fromCache}
      fromCache={fromCache}
      errorMessage={combinedError}
      authHint={
        selectionMode === 'vocab' && !sessionCanSave && medicalTerm
          ? 'Sign in to save terms to your account.'
          : null
      }
    />
  )
}
