'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CaseInfoContent, CaseVocabEntry } from '@/data/scenarios'
import MedacademyVocabHighlight, { CaseFigureBlock } from './MedacademyVocabHighlight'

const NAV_ITEMS = [
  { id: 'imaging', label: 'Imaging' },
  { id: 'hpi', label: 'HPI' },
  { id: 'pmh', label: 'PMH' },
  { id: 'family-history', label: 'Family History' },
  { id: 'physical-exam', label: 'Physical Exam' },
  { id: 'figure', label: 'Figure' },
] as const

type Props = {
  content: CaseInfoContent
  vocab: CaseVocabEntry[]
  caseTitle: string
  viewedSections: string[]
  onSectionViewed: (sectionId: string) => void
  scrollToSection?: string | null
  onScrollComplete?: () => void
}

function CaseText({
  text,
  vocab,
  caseTitle,
}: {
  text: string
  vocab: CaseVocabEntry[]
  caseTitle: string
}) {
  if (vocab.length === 0) return <>{text}</>
  return <MedacademyVocabHighlight text={text} vocab={vocab} caseTitle={caseTitle} />
}

function CollapsibleCard({
  id,
  title,
  badge,
  defaultOpen = true,
  children,
  onOpen,
}: {
  id: string
  title: string
  badge?: string
  defaultOpen?: boolean
  children: React.ReactNode
  onOpen?: () => void
}) {
  const [open, setOpen] = useState(defaultOpen)

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev
      if (next) onOpen?.()
      return next
    })
  }

  return (
    <section
      id={id}
      className="scroll-mt-28 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm dark:border-[#14345C] dark:bg-[#0a1f3d]"
    >
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 bg-slate-50/90 px-5 py-4 text-left transition hover:opacity-95 dark:bg-[#071A33]"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">{title}</h3>
          {badge ? (
            <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-800 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-300">
              {badge}
            </span>
          ) : null}
        </div>
        <span
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open ? (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-[#14345C]/60">{children}</div>
      ) : null}
    </section>
  )
}

function useSectionInView(sectionId: string, onViewed: (id: string) => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onViewed(sectionId)
      },
      { threshold: 0.25, rootMargin: '-40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionId, onViewed])

  return ref
}

export default function ClinicalDataPanel({
  content,
  vocab,
  caseTitle,
  viewedSections,
  onSectionViewed,
  scrollToSection,
  onScrollComplete,
}: Props) {
  const scrollTo = useCallback(
    (id: string) => {
      onSectionViewed(id)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [onSectionViewed]
  )

  const markViewed = useCallback(
    (id: string) => {
      if (!viewedSections.includes(id)) onSectionViewed(id)
    },
    [viewedSections, onSectionViewed]
  )

  const imagingText =
    content.clinicalDataImaging ??
    'CT scan was ordered to rule out a pulmonary embolism (PE). The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.'

  const imagingRef = useSectionInView('imaging', markViewed)
  const hpiRef = useSectionInView('hpi', markViewed)
  const pmhRef = useSectionInView('pmh', markViewed)
  const familyRef = useSectionInView('family-history', markViewed)
  const peRef = useSectionInView('physical-exam', markViewed)
  const figureRef = useSectionInView('figure', markViewed)

  useEffect(() => {
    if (!scrollToSection) return
    const timer = window.setTimeout(() => {
      onSectionViewed(scrollToSection)
      document.getElementById(scrollToSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onScrollComplete?.()
    }, 100)
    return () => window.clearTimeout(timer)
  }, [scrollToSection, onSectionViewed, onScrollComplete])

  return (
    <div className="case-panel !border-0 !bg-transparent !p-0 !shadow-none">
      <header className="mb-6 rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm dark:border-[#14345C] dark:from-[#071A33] dark:to-[#0a1f3d]">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-primary-200/80 bg-primary-100 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-primary-900 dark:border-primary-700/50 dark:bg-primary-900/40 dark:text-primary-200">
            Clinical Data
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-slate-700 dark:border-[#14345C] dark:bg-[#071A33] dark:text-[#CBD5E1]">
            Review only
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] sm:text-2xl">
          Clinical Data Review
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#CBD5E1]">
          Review the information already available in this case. No tests can be ordered here.
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start lg:gap-8">
        <nav className="mb-6 lg:sticky lg:top-24 lg:mb-0 lg:self-start" aria-label="Clinical data sections">
          <p className="mb-2 hidden text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94a3b8] lg:block">
            Sections
          </p>
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
            {NAV_ITEMS.map((item) => {
              const reviewed = viewedSections.includes(item.id)
              return (
                <li key={item.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 dark:border-[#14345C] dark:bg-[#071A33] dark:text-[#CBD5E1] dark:hover:border-primary-600/50 dark:hover:bg-primary-950/30 dark:hover:text-primary-200 lg:block lg:w-full lg:border-0 lg:bg-transparent lg:px-2 lg:py-1.5 lg:text-left lg:text-sm lg:hover:bg-slate-100/80 dark:lg:hover:bg-[#14345C]/40"
                  >
                    {reviewed ? (
                      <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                        ✓
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="min-w-0 space-y-4">
          <div ref={imagingRef}>
            <CollapsibleCard
              id="imaging"
              title="Imaging"
              badge="Already Available"
              defaultOpen
              onOpen={() => markViewed('imaging')}
            >
              <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
                <CaseText text={imagingText} vocab={vocab} caseTitle={caseTitle} />
              </p>
              {content.figureCaption ? (
                <div className="mt-6 border-t border-slate-200 pt-6 dark:border-[#14345C]/60">
                  <CaseFigureBlock
                    figureImageUrl={content.figureImageUrl}
                    figureCaption={content.figureCaption}
                  />
                </div>
              ) : null}
            </CollapsibleCard>
          </div>

          <div ref={hpiRef}>
            <CollapsibleCard
              id="hpi"
              title="History of Present Illness"
              defaultOpen
              onOpen={() => markViewed('hpi')}
            >
              <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
                <CaseText text={content.hpi} vocab={vocab} caseTitle={caseTitle} />
              </p>
            </CollapsibleCard>
          </div>

          <div ref={pmhRef}>
            <CollapsibleCard id="pmh" title="Past Medical History" defaultOpen onOpen={() => markViewed('pmh')}>
              <ul className="space-y-2 text-base text-slate-700 dark:text-[#CBD5E1]">
                {content.pmh.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-slate-400 dark:text-slate-500" aria-hidden>
                      •
                    </span>
                    <CaseText text={item} vocab={vocab} caseTitle={caseTitle} />
                  </li>
                ))}
              </ul>
            </CollapsibleCard>
          </div>

          <div ref={familyRef}>
            <CollapsibleCard
              id="family-history"
              title="Family History"
              defaultOpen
              onOpen={() => markViewed('family-history')}
            >
              <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
                <CaseText text={content.familyHistory} vocab={vocab} caseTitle={caseTitle} />
              </p>
            </CollapsibleCard>
          </div>

          <div ref={peRef}>
            <CollapsibleCard
              id="physical-exam"
              title="Physical Examination"
              defaultOpen
              onOpen={() => markViewed('physical-exam')}
            >
              <ul className="space-y-2 text-base text-slate-700 dark:text-[#CBD5E1]">
                {content.physicalExam.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-[#14345C]/60 dark:bg-[#071A33]/50"
                  >
                    <CaseText text={item} vocab={vocab} caseTitle={caseTitle} />
                  </li>
                ))}
              </ul>
            </CollapsibleCard>
          </div>

          <div ref={figureRef}>
            <CollapsibleCard id="figure" title="Figure" defaultOpen onOpen={() => markViewed('figure')}>
              <CaseFigureBlock
                figureImageUrl={content.figureImageUrl}
                figureCaption={content.figureCaption}
              />
            </CollapsibleCard>
          </div>
        </div>
      </div>
    </div>
  )
}
