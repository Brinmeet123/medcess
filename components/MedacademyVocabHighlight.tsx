'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import type { CaseVocabEntry } from '@/data/scenarios'
import { useVocabStore } from '@/lib/useVocabStore'

/** Phrase patterns in case text → vocab term label (longest first) */
export const MEDACADEMY_HIGHLIGHT_PHRASES: { phrase: string; term: string }[] = [
  { phrase: 'changes in mentation/coordination', term: 'Mentation' },
  { phrase: '65-70 pack year smoking history', term: 'Pack year' },
  { phrase: 'pulmonary embolism (PE)', term: 'Pulmonary embolism / PE' },
  { phrase: 'subtrochanteric hip fracture', term: 'Subtrochanteric hip fracture' },
  { phrase: 'Hx of diverticular abscess requiring colon resection in 1982', term: 'Colon resection' },
  { phrase: 'Hx of GI bleed 2004 with negative endoscopy', term: 'GI bleed' },
  { phrase: 'right infrahilar mass', term: 'Right infrahilar mass' },
  { phrase: 'subcarinal lymph nodes', term: 'Subcarinal lymph nodes' },
  { phrase: 'chronic low back pain', term: 'Chronic low back pain' },
  { phrase: 'cranial nerves (CN)', term: 'Cranial nerves / CN' },
  { phrase: 'shortness of breath', term: 'Shortness of breath' },
  { phrase: 'diverticular abscess', term: 'Diverticular abscess' },
  { phrase: 'negative endoscopy', term: 'Negative endoscopy' },
  { phrase: 'colon resection', term: 'Colon resection' },
  { phrase: 'focal weakness', term: 'Focal weakness' },
  { phrase: 'chest pain', term: 'Chest pain' },
  { phrase: 'hemoptysis', term: 'Hemoptysis' },
  { phrase: 'hoarseness', term: 'Hoarseness' },
  { phrase: 'headache', term: 'Headache' },
  { phrase: 'fixation', term: 'Fixation' },
  { phrase: 'Hypothyroidism', term: 'Hypothyroidism' },
  { phrase: 'hypothyroidism', term: 'Hypothyroidism' },
  { phrase: 'auscultation', term: 'Auscultation' },
  { phrase: 'percussion', term: 'Percussion' },
  { phrase: 'endoscopy', term: 'Endoscopy' },
  { phrase: 'HEENT', term: 'HEENT' },
  { phrase: 'EOMI', term: 'EOMI' },
  { phrase: 'RRR', term: 'RRR' },
  { phrase: 'edema', term: 'Edema' },
  { phrase: 'HTN', term: 'HTN' },
  { phrase: 'GI bleed', term: 'GI bleed' },
  { phrase: '(OP) clear', term: 'OP clear' },
  { phrase: 'OP clear', term: 'OP clear' },
]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildVocabMap(entries: CaseVocabEntry[]): Map<string, CaseVocabEntry> {
  const map = new Map<string, CaseVocabEntry>()
  for (const e of entries) {
    map.set(e.term.toLowerCase(), e)
  }
  return map
}

type PopoverState = {
  entry: CaseVocabEntry
  x: number
  y: number
}

type Props = {
  text: string
  vocab: CaseVocabEntry[]
  caseTitle: string
}

export default function MedacademyVocabHighlight({ text, vocab, caseTitle }: Props) {
  const { status } = useSession()
  const { saveCaseVocabTerm, hasSavedPracticeTerm, isLoaded } = useVocabStore()
  const [popover, setPopover] = useState<PopoverState | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  const vocabMap = useMemo(() => buildVocabMap(vocab), [vocab])

  const resolveEntry = useCallback(
    (termLabel: string): CaseVocabEntry | undefined => {
      const direct = vocabMap.get(termLabel.toLowerCase())
      if (direct) return direct
      return vocab.find((e) => e.term.toLowerCase().includes(termLabel.toLowerCase()))
    },
    [vocab, vocabMap]
  )

  useEffect(() => {
    if (!popover) return
    const onPointer = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopover(null)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopover(null)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [popover])

  const pattern = useMemo(
    () =>
      new RegExp(
        `(${MEDACADEMY_HIGHLIGHT_PHRASES.map((p) => escapeRegex(p.phrase)).join('|')})`,
        'gi'
      ),
    []
  )

  const phraseToTerm = useMemo(() => {
    const m = new Map<string, string>()
    for (const p of MEDACADEMY_HIGHLIGHT_PHRASES) {
      m.set(p.phrase.toLowerCase(), p.term)
    }
    return m
  }, [])

  const parts = text.split(pattern)

  const handleTermClick = (phrase: string, el: HTMLElement) => {
    const termLabel = phraseToTerm.get(phrase.toLowerCase())
    if (!termLabel) return
    const entry = resolveEntry(termLabel)
    if (!entry) return
    const rect = el.getBoundingClientRect()
    setPopover({
      entry,
      x: Math.min(rect.left, window.innerWidth - 300),
      y: rect.bottom + 8,
    })
    setSavedFlash(false)
  }

  const handleSave = async () => {
    if (!popover || hasSavedPracticeTerm(popover.entry.term)) return
    setSaving(true)
    try {
      const ok = await saveCaseVocabTerm({
        term: popover.entry.term,
        definition: popover.entry.definition,
        sourceCaseName: caseTitle,
      })
      if (ok) setSavedFlash(true)
    } finally {
      setSaving(false)
    }
  }

  const isSaved =
    popover && isLoaded && (hasSavedPracticeTerm(popover.entry.term) || savedFlash)

  return (
    <>
      {parts.map((part, i) => {
        const termLabel = phraseToTerm.get(part.toLowerCase())
        if (!termLabel || !resolveEntry(termLabel)) return <span key={i}>{part}</span>
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => handleTermClick(part, e.currentTarget)}
            className="cursor-pointer rounded-sm bg-amber-100/90 px-0.5 text-inherit underline decoration-amber-400/70 decoration-2 underline-offset-2 transition hover:bg-amber-200/90 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 dark:decoration-amber-600/60"
          >
            {part}
          </button>
        )
      })}

      {popover ? (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`Definition: ${popover.entry.term}`}
          className="fixed z-50 w-[min(288px,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-[#14345C] dark:bg-[#0a1f3d]"
          style={{ left: popover.x, top: popover.y }}
        >
          <p className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">{popover.entry.term}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
            {popover.entry.definition}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-[#94a3b8]">
            <span className="font-medium text-slate-600 dark:text-[#CBD5E1]">Why it matters: </span>
            {popover.entry.whyItMatters}
          </p>
          {status !== 'authenticated' ? (
            <p className="mt-3 text-xs text-amber-800 dark:text-amber-300">
              <Link href="/login" className="font-semibold underline">
                Sign in
              </Link>{' '}
              to sync your Practice List.
            </p>
          ) : null}
          <button
            type="button"
            disabled={Boolean(isSaved) || saving}
            onClick={handleSave}
            className="mt-3 w-full rounded-lg border border-primary-300 bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-900 transition hover:bg-primary-100 disabled:cursor-default disabled:opacity-70 dark:border-primary-600/50 dark:bg-primary-950/40 dark:text-primary-200 dark:hover:bg-primary-950/60"
          >
            {isSaved ? 'Saved' : saving ? 'Saving…' : 'Add to Practice List'}
          </button>
        </div>
      ) : null}
    </>
  )
}

export function CaseFigureBlock({
  figureImageUrl,
  figureCaption,
  placeholderText = 'CT image placeholder',
}: {
  figureImageUrl?: string
  figureCaption?: string
  placeholderText?: string
}) {
  if (!figureCaption && !figureImageUrl) {
    return (
      <div className="mb-4 flex min-h-[200px] max-w-2xl items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 dark:border-[#14345C] dark:bg-[#071A33]">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{placeholderText}</p>
      </div>
    )
  }
  if (!figureCaption) return null
  return (
    <>
      {figureImageUrl ? (
        <img
          src={figureImageUrl}
          alt={figureCaption}
          className="mb-4 w-full max-w-2xl rounded-lg border border-slate-200 dark:border-[#14345C]"
        />
      ) : (
        <div className="mb-4 flex min-h-[200px] max-w-2xl items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 dark:border-[#14345C] dark:bg-[#071A33]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{placeholderText}</p>
        </div>
      )}
      <p className="text-sm italic leading-relaxed text-slate-600 dark:text-[#94a3b8]">{figureCaption}</p>
    </>
  )
}
