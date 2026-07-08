'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CaseInfoContent, CaseVocabEntry } from '@/data/scenarios'
import MedacademyVocabHighlight, { CaseFigureBlock } from './MedacademyVocabHighlight'

const PATHOLOGY_NAV_ITEMS = [
  { id: 'imaging', label: 'Imaging' },
  { id: 'hpi', label: 'HPI' },
  { id: 'pmh', label: 'PMH' },
  { id: 'family-history', label: 'Family History' },
  { id: 'physical-exam', label: 'Physical Exam' },
] as const

const CARDIO_NAV_ITEMS = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'vital-signs', label: 'Vital Signs' },
  { id: 'ecg', label: 'ECG / EKG Results' },
  { id: 'lab-values', label: 'Lab Values' },
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

function LabValuesTable({
  rows,
  vocab,
  caseTitle,
}: {
  rows: NonNullable<CaseInfoContent['labValues']>
  vocab: CaseVocabEntry[]
  caseTitle: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-[#14345C]">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-[#14345C]">
        <thead className="bg-slate-50 dark:bg-[#071A33]">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-[#94a3b8]"
            >
              Time point
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-[#94a3b8]"
            >
              Troponin I/T
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-[#94a3b8]"
            >
              Creatine Kinase
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-[#94a3b8]"
            >
              CK-MB
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white dark:divide-[#14345C]/60 dark:bg-[#0a1f3d]">
          {rows.map((row) => (
            <tr key={row.timepoint} className="transition hover:bg-slate-50/80 dark:hover:bg-[#071A33]/50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900 dark:text-[#F8FAFC]">
                {row.timepoint}
              </td>
              <td className="px-4 py-3 tabular-nums text-slate-700 dark:text-[#CBD5E1]">
                <CaseText text={row.troponin} vocab={vocab} caseTitle={caseTitle} />
              </td>
              <td className="px-4 py-3 tabular-nums text-slate-700 dark:text-[#CBD5E1]">
                <CaseText text={row.creatineKinase} vocab={vocab} caseTitle={caseTitle} />
              </td>
              <td className="px-4 py-3 tabular-nums text-slate-700 dark:text-[#CBD5E1]">
                <CaseText text={row.ckMb} vocab={vocab} caseTitle={caseTitle} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CardioClinicalData({
  content,
  vocab,
  caseTitle,
  viewedSections,
  markViewed,
}: {
  content: CaseInfoContent
  vocab: CaseVocabEntry[]
  caseTitle: string
  viewedSections: string[]
  markViewed: (id: string) => void
}) {
  const presentationRef = useSectionInView('presentation', markViewed)
  const vitalsRef = useSectionInView('vital-signs', markViewed)
  const ecgRef = useSectionInView('ecg', markViewed)
  const labsRef = useSectionInView('lab-values', markViewed)

  const presentationText = content.presentation ?? content.introduction
  const ecgHeading = content.ecgHeading ?? 'ECG (EKG) Results:'

  return (
    <>
      <div ref={presentationRef}>
        <CollapsibleCard
          id="presentation"
          title="Presentation"
          defaultOpen
          onOpen={() => markViewed('presentation')}
        >
          <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
            <CaseText text={presentationText} vocab={vocab} caseTitle={caseTitle} />
          </p>
        </CollapsibleCard>
      </div>

      <div ref={vitalsRef}>
        <CollapsibleCard
          id="vital-signs"
          title="Vital Signs"
          defaultOpen
          onOpen={() => markViewed('vital-signs')}
        >
          <div className="space-y-1 text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
            {(content.vitalSigns ?? []).map((line, idx) =>
              line ? (
                <p key={idx}>
                  <CaseText text={line} vocab={vocab} caseTitle={caseTitle} />
                </p>
              ) : (
                <div key={idx} className="h-2" aria-hidden />
              )
            )}
          </div>
        </CollapsibleCard>
      </div>

      <div ref={ecgRef}>
        <CollapsibleCard
          id="ecg"
          title="ECG (EKG) Results"
          defaultOpen
          onOpen={() => markViewed('ecg')}
        >
          <p className="mb-4 text-base font-medium text-slate-800 dark:text-[#F8FAFC]">{ecgHeading}</p>
          <CaseFigureBlock
            figureImageUrl={content.ecgFigureImageUrl}
            figureCaption={content.ecgFigureCaption}
            placeholderText="ECG image placeholder"
          />
          {content.ecgFindings ? (
            <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
              <CaseText text={content.ecgFindings} vocab={vocab} caseTitle={caseTitle} />
            </p>
          ) : null}
        </CollapsibleCard>
      </div>

      <div ref={labsRef}>
        <CollapsibleCard
          id="lab-values"
          title="Lab Values"
          defaultOpen
          onOpen={() => markViewed('lab-values')}
        >
          {content.labValuesIntro ? (
            <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
              <CaseText text={content.labValuesIntro} vocab={vocab} caseTitle={caseTitle} />
            </p>
          ) : null}
          {content.labValues && content.labValues.length > 0 ? (
            <LabValuesTable rows={content.labValues} vocab={vocab} caseTitle={caseTitle} />
          ) : null}
        </CollapsibleCard>
      </div>
    </>
  )
}

function PathologyClinicalData({
  content,
  vocab,
  caseTitle,
  markViewed,
}: {
  content: CaseInfoContent
  vocab: CaseVocabEntry[]
  caseTitle: string
  markViewed: (id: string) => void
}) {
  const imagingText =
    content.clinicalDataImaging ??
    'CT scan was ordered to rule out a pulmonary embolism (PE). The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.'

  const imagingRef = useSectionInView('imaging', markViewed)
  const hpiRef = useSectionInView('hpi', markViewed)
  const pmhRef = useSectionInView('pmh', markViewed)
  const familyRef = useSectionInView('family-history', markViewed)
  const peRef = useSectionInView('physical-exam', markViewed)

  return (
    <>
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
            <CaseText text={content.hpi ?? ''} vocab={vocab} caseTitle={caseTitle} />
          </p>
        </CollapsibleCard>
      </div>

      <div ref={pmhRef}>
        <CollapsibleCard id="pmh" title="Past Medical History" defaultOpen onOpen={() => markViewed('pmh')}>
          <ul className="space-y-2 text-base text-slate-700 dark:text-[#CBD5E1]">
            {(content.pmh ?? []).map((item) => (
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
            <CaseText text={content.familyHistory ?? ''} vocab={vocab} caseTitle={caseTitle} />
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
            {(content.physicalExam ?? []).map((item) => (
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
    </>
  )
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
  const isCardioLayout = content.clinicalDataLayout === 'cardio'
  const navItems = isCardioLayout ? CARDIO_NAV_ITEMS : PATHOLOGY_NAV_ITEMS

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
            {navItems.map((item) => {
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
          {isCardioLayout ? (
            <CardioClinicalData
              content={content}
              vocab={vocab}
              caseTitle={caseTitle}
              viewedSections={viewedSections}
              markViewed={markViewed}
            />
          ) : (
            <PathologyClinicalData
              content={content}
              vocab={vocab}
              caseTitle={caseTitle}
              markViewed={markViewed}
            />
          )}
        </div>
      </div>
    </div>
  )
}
