'use client'

import { useCallback, useState } from 'react'
import type { CaseInfoContent, ScenarioDifficulty } from '@/data/scenarios'

/** Phrases to highlight — longest first to avoid partial overlap */
const HIGHLIGHT_PHRASES = [
  'changes in mentation/coordination',
  '65-70 pack year smoking history',
  'subtrochanteric hip fracture',
  'pulmonary embolism (PE)',
  'subcarinal lymph nodes',
  'right infrahilar mass',
  'shortness of breath',
  'chronic low back pain',
  'chest pain',
  'hemoptysis',
  'hoarseness',
  'headache',
  'fixation',
] as const

const NAV_ITEMS = [
  { id: 'case-snapshot', label: 'Case Snapshot' },
  { id: 'key-imaging', label: 'Key Imaging Finding' },
  { id: 'hpi', label: 'HPI' },
  { id: 'pmh', label: 'PMH' },
  { id: 'family-history', label: 'Family History' },
  { id: 'physical-exam', label: 'Physical Exam' },
  { id: 'figure', label: 'Figure' },
] as const

type Props = {
  content: CaseInfoContent
  title: string
  subtitle?: string
  difficulty: ScenarioDifficulty
  showVocabButton?: boolean
  onStartInterview?: () => void
  onReviewVocab?: () => void
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function HighlightedText({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${HIGHLIGHT_PHRASES.map(escapeRegex).join('|')})`,
    'gi'
  )
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = HIGHLIGHT_PHRASES.some(
          (p) => p.toLowerCase() === part.toLowerCase()
        )
        if (!isHighlight) return <span key={i}>{part}</span>
        return (
          <mark
            key={i}
            className="rounded-sm bg-amber-100/90 px-0.5 text-inherit underline decoration-amber-400/70 decoration-2 underline-offset-2 dark:bg-amber-950/50 dark:decoration-amber-600/60"
          >
            {part}
          </mark>
        )
      })}
    </>
  )
}

function CollapsibleCard({
  id,
  title,
  defaultOpen = true,
  children,
  variant = 'default',
}: {
  id: string
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  variant?: 'default' | 'accent'
}) {
  const [open, setOpen] = useState(defaultOpen)

  const borderClass =
    variant === 'accent'
      ? 'border-teal-200/80 dark:border-teal-800/40'
      : 'border-slate-200/90 dark:border-[#14345C]'

  const headerClass =
    variant === 'accent'
      ? 'bg-teal-50/80 dark:bg-teal-950/25'
      : 'bg-slate-50/90 dark:bg-[#071A33]'

  return (
    <section
      id={id}
      className={`scroll-mt-28 rounded-xl border ${borderClass} bg-white dark:bg-[#0a1f3d] shadow-sm overflow-hidden`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left ${headerClass} transition hover:opacity-95`}
        aria-expanded={open}
      >
        <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">{title}</h3>
        <span
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open ? <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#14345C]/60">{children}</div> : null}
    </section>
  )
}

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'brand' | 'neutral' | 'level' }) {
  const tones = {
    brand:
      'bg-primary-100 text-primary-900 border-primary-200/80 dark:bg-primary-900/40 dark:text-primary-200 dark:border-primary-700/50',
    neutral:
      'bg-slate-100 text-slate-700 border-slate-200/80 dark:bg-[#071A33] dark:text-[#CBD5E1] dark:border-[#14345C]',
    level:
      'bg-amber-100 text-amber-900 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-700/50',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export default function CaseInfoPanel({
  content,
  title,
  subtitle,
  difficulty,
  showVocabButton = false,
  onStartInterview,
  onReviewVocab,
}: Props) {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const keyImaging =
    content.keyImagingFinding ??
    'The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.'

  return (
    <div className="case-panel !p-0 !border-0 !shadow-none !bg-transparent">
      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8 lg:items-start">
        {/* Side / anchor navigation */}
        <nav
          className="mb-6 lg:mb-0 lg:sticky lg:top-24 lg:self-start"
          aria-label="Case info sections"
        >
          <p className="mb-2 hidden text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94a3b8] lg:block">
            On this page
          </p>
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:flex-col lg:overflow-visible lg:pb-0 lg:gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="whitespace-nowrap rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 dark:border-[#14345C] dark:bg-[#071A33] dark:text-[#CBD5E1] dark:hover:border-primary-600/50 dark:hover:bg-primary-950/30 dark:hover:text-primary-200 lg:block lg:w-full lg:border-0 lg:bg-transparent lg:px-2 lg:py-1.5 lg:text-left lg:text-sm lg:hover:bg-slate-100/80 dark:lg:hover:bg-[#14345C]/40"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-6">
          {/* Header */}
          <header className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm dark:border-[#14345C] dark:from-[#071A33] dark:to-[#0a1f3d]">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge tone="brand">MEDacademy Case</Badge>
              <Badge tone="level">{difficulty}</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm font-medium text-primary-700 dark:text-primary-300">{subtitle}</p>
            ) : null}
          </header>

          {/* Case Snapshot */}
          <section
            id="case-snapshot"
            className="scroll-mt-28 rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-[#14345C] dark:bg-[#0a1f3d]"
          >
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">Case Snapshot</h2>
            <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
              <HighlightedText text={content.introduction} />
            </p>
          </section>

          {/* Key Imaging Finding */}
          <section
            id="key-imaging"
            className="scroll-mt-28 rounded-xl border border-teal-200/90 bg-teal-50/50 p-6 shadow-sm dark:border-teal-800/40 dark:bg-teal-950/20"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600/10 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 6h16v12H4V6zm2 2v8h12V8H6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-teal-900 dark:text-teal-200">Key Imaging Finding</h2>
            </div>
            <p className="text-base leading-relaxed text-slate-800 dark:text-[#CBD5E1]">
              <HighlightedText text={keyImaging} />
            </p>
          </section>

          {/* HPI */}
          <CollapsibleCard id="hpi" title="History of Present Illness" defaultOpen>
            <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
              <HighlightedText text={content.hpi} />
            </p>
          </CollapsibleCard>

          {/* PMH */}
          <CollapsibleCard id="pmh" title="Past Medical History" defaultOpen>
            <ul className="space-y-2 text-base text-slate-700 dark:text-[#CBD5E1]">
              {content.pmh.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden />
                  <span>
                    <HighlightedText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </CollapsibleCard>

          {/* Family History */}
          <CollapsibleCard id="family-history" title="Family History" defaultOpen>
            <p className="text-base text-slate-700 dark:text-[#CBD5E1]">
              <HighlightedText text={content.familyHistory} />
            </p>
          </CollapsibleCard>

          {/* Physical Examination */}
          <CollapsibleCard id="physical-exam" title="Physical Examination" defaultOpen>
            <ul className="space-y-3 text-base text-slate-700 dark:text-[#CBD5E1]">
              {content.physicalExam.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-[#14345C]/60 dark:bg-[#071A33]/50"
                >
                  <HighlightedText text={item} />
                </li>
              ))}
            </ul>
          </CollapsibleCard>

          {/* Figure */}
          {content.figureCaption ? (
            <section
              id="figure"
              className="scroll-mt-28 rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-[#14345C] dark:bg-[#0a1f3d]"
            >
              {content.figureImageUrl ? (
                <img
                  src={content.figureImageUrl}
                  alt={content.figureCaption}
                  className="mb-4 w-full max-w-2xl rounded-lg border border-slate-200 dark:border-[#14345C]"
                />
              ) : (
                <div className="mb-4 flex min-h-[200px] max-w-2xl items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 dark:border-[#14345C] dark:bg-[#071A33]">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">CT image placeholder</p>
                </div>
              )}
              <p className="text-sm italic leading-relaxed text-slate-600 dark:text-[#94a3b8]">
                {content.figureCaption}
              </p>
            </section>
          ) : null}

          {/* Action buttons */}
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-[#14345C] sm:flex-row sm:flex-wrap">
            {onStartInterview ? (
              <button
                type="button"
                onClick={onStartInterview}
                className="btn-press medcess-btn-primary flex-1 min-w-[200px] px-6 py-3 text-center text-sm font-semibold sm:flex-none"
              >
                Start Patient Interview
              </button>
            ) : null}
            {showVocabButton && onReviewVocab ? (
              <button
                type="button"
                onClick={onReviewVocab}
                className="btn-press flex-1 min-w-[200px] rounded-lg border border-primary-300 bg-white px-6 py-3 text-center text-sm font-semibold text-primary-800 shadow-sm transition hover:bg-primary-50 dark:border-primary-600/50 dark:bg-[#0a1f3d] dark:text-primary-300 dark:hover:bg-primary-950/40 sm:flex-none"
              >
                Review Vocab
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
