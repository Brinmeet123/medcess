'use client'

import type { SectionLayout } from '@/data/scenarios'

export type ClinicalSection =
  | 'case-info'
  | 'history'
  | 'exam'
  | 'tests'
  | 'diagnosis'
  | 'vocab'
  | 'debrief'

export const DEFAULT_SECTION_ORDER: { id: ClinicalSection; label: string }[] = [
  { id: 'history', label: 'Interview' },
  { id: 'exam', label: 'Exam' },
  { id: 'tests', label: 'Tests' },
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'debrief', label: 'Results' },
]

export const MEDACADEMY_SECTION_ORDER: { id: ClinicalSection; label: string }[] = [
  { id: 'case-info', label: 'Case Info' },
  { id: 'history', label: 'Patient Interview' },
  { id: 'tests', label: 'Tests' },
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'vocab', label: 'Vocab' },
]

/** @deprecated Use getSectionOrder() */
export const SECTION_ORDER = DEFAULT_SECTION_ORDER

export function getSectionOrder(layout?: SectionLayout): { id: ClinicalSection; label: string }[] {
  if (layout === 'medacademy') return MEDACADEMY_SECTION_ORDER
  return DEFAULT_SECTION_ORDER
}

export function getSectionStepCount(layout?: SectionLayout): number {
  return getSectionOrder(layout).length
}

export function clinicalSectionToStep(section: ClinicalSection, layout?: SectionLayout): number {
  const order = getSectionOrder(layout)
  const i = order.findIndex((s) => s.id === section)
  if (i >= 0) return i + 1
  // debrief is post-submit for medacademy layout (not in tab bar)
  if (section === 'debrief') return order.length + 1
  return 1
}

export type SectionCompletion = Partial<Record<ClinicalSection, boolean>>

type Props = {
  active: ClinicalSection
  onChange: (section: ClinicalSection) => void
  /** Results tab stays locked until a final diagnosis is submitted (default layout only). */
  canAccessDebrief?: boolean
  /** Per-tab completion based on actual learner actions, not tab order. */
  sectionCompletion: SectionCompletion
  sectionLayout?: SectionLayout
  /** When true, all tabs are accessible from the start (no linear unlock). */
  unlockAllTabs?: boolean
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M11.2 3.5L5.25 9.45L2.8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function tabButtonClasses(opts: {
  isActive: boolean
  isCompleted: boolean
  isLocked: boolean
  isUnlockedAhead: boolean
}) {
  const { isActive, isCompleted, isLocked, isUnlockedAhead } = opts
  const base =
    'flex flex-1 min-w-0 h-14 sm:h-16 items-center justify-center border-r border-slate-200/90 dark:border-[#14345C] last:border-r-0 border-b-4 border-b-transparent box-border transition-colors duration-300 ease-out'
  if (isLocked) {
    return `${base} bg-slate-100/95 dark:bg-[#020817] text-slate-400 dark:text-slate-500 opacity-[0.72] cursor-not-allowed font-medium`
  }
  if (isActive) {
    return `${base} bg-primary-100 dark:bg-primary-900/50 text-primary-900 dark:text-[#F8FAFC] font-bold cursor-pointer border-b-primary-600 dark:border-b-primary-400`
  }
  if (isCompleted) {
    return `${base} bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold cursor-pointer hover:bg-emerald-100/90 dark:hover:bg-emerald-950/60`
  }
  if (isUnlockedAhead) {
    return `${base} bg-slate-50 dark:bg-[#0a1f3d] text-slate-600 dark:text-[#CBD5E1] font-medium cursor-pointer hover:bg-slate-100/90 dark:hover:bg-[#14345C]/40`
  }
  return `${base} bg-slate-50 dark:bg-[#0a1f3d] text-slate-600 dark:text-[#CBD5E1] font-medium cursor-pointer hover:bg-slate-100/90 dark:hover:bg-[#14345C]/40`
}

export default function SectionNav({
  active,
  onChange,
  canAccessDebrief = false,
  sectionCompletion,
  sectionLayout,
  unlockAllTabs = false,
}: Props) {
  const sectionOrder = getSectionOrder(sectionLayout)
  const activeStep = clinicalSectionToStep(active, sectionLayout)

  const tabs = sectionOrder.map((section, index) => {
    const step = index + 1
    const isActive = active === section.id
    const isLocked = false
    const isCompleted = Boolean(sectionCompletion[section.id])
    const isUnlockedAhead = !unlockAllTabs && !isLocked && !isActive && step > activeStep

    return (
      <button
        key={section.id}
        type="button"
        onClick={() => !isLocked && onChange(section.id)}
        disabled={isLocked}
        className={[
          'relative text-sm leading-none px-2 sm:px-4 py-0',
          tabButtonClasses({ isActive, isCompleted, isLocked, isUnlockedAhead }),
        ].join(' ')}
      >
        <span className="flex w-full min-w-0 items-center justify-center gap-1.5 text-center">
          {isCompleted && <CheckIcon className="shrink-0 text-emerald-600 dark:text-emerald-400" />}
          <span className="truncate">{section.label}</span>
        </span>
      </button>
    )
  })

  // Default layout: show Results tab (locked until diagnosis)
  if (sectionLayout !== 'medacademy') {
    const debriefLocked = !canAccessDebrief
    tabs.push(
      <button
        key="debrief"
        type="button"
        onClick={() => !debriefLocked && onChange('debrief')}
        disabled={debriefLocked}
        className={[
          'relative text-sm leading-none px-2 sm:px-4 py-0',
          tabButtonClasses({
            isActive: active === 'debrief',
            isCompleted: Boolean(sectionCompletion.debrief),
            isLocked: debriefLocked,
            isUnlockedAhead: false,
          }),
        ].join(' ')}
        title={debriefLocked ? 'Choose a final diagnosis to view results.' : undefined}
      >
        <span className="flex w-full min-w-0 items-center justify-center gap-1.5 text-center">
          {sectionCompletion.debrief && (
            <CheckIcon className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          )}
          <span className="truncate">Results</span>
        </span>
      </button>
    )
  }

  return (
    <div
      className="sticky top-0 z-10 mb-6 w-full rounded-lg border border-slate-200/90 dark:border-[#14345C] bg-white dark:bg-[#071A33] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] overflow-hidden"
      role="navigation"
      aria-label="Case steps"
    >
      <div className="flex w-full min-w-0 overflow-x-auto scrollbar-hide md:overflow-visible">{tabs}</div>
    </div>
  )
}
