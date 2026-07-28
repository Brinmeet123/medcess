'use client'

export type ClinicalSection =
  | 'history'
  | 'exam'
  | 'tests'
  | 'diagnosis'
  | 'debrief'

export const DEFAULT_SECTION_ORDER: { id: ClinicalSection; label: string }[] = [
  { id: 'history', label: 'Interview' },
  { id: 'exam', label: 'Exam' },
  { id: 'tests', label: 'Tests' },
  { id: 'diagnosis', label: 'Diagnosis' },
]

/** @deprecated Use getSectionOrder() */
export const SECTION_ORDER = DEFAULT_SECTION_ORDER

export function getSectionOrder(): { id: ClinicalSection; label: string }[] {
  return DEFAULT_SECTION_ORDER
}

export function getSectionStepCount(): number {
  return DEFAULT_SECTION_ORDER.length + 1
}

export function clinicalSectionToStep(section: ClinicalSection): number {
  const i = DEFAULT_SECTION_ORDER.findIndex((s) => s.id === section)
  if (i >= 0) return i + 1
  if (section === 'debrief') return DEFAULT_SECTION_ORDER.length + 1
  return 1
}

export type SectionCompletion = Partial<Record<ClinicalSection, boolean>>

type Props = {
  active: ClinicalSection
  onChange: (section: ClinicalSection) => void
  /** Results tab stays locked until a final diagnosis is submitted. */
  canAccessDebrief?: boolean
  /** Tooltip when Results tab is locked */
  debriefLockedReason?: string
  /** Per-tab completion based on actual learner actions, not tab order. */
  sectionCompletion: SectionCompletion
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
  debriefLockedReason = 'Choose a final diagnosis to view results.',
}: Props) {
  const sectionOrder = DEFAULT_SECTION_ORDER
  const activeStep = clinicalSectionToStep(active)

  const tabs = sectionOrder.map((section, index) => {
    const step = index + 1
    const isActive = active === section.id
    const isLocked = false
    const isCompleted = Boolean(sectionCompletion[section.id])
    const isUnlockedAhead = !isLocked && !isActive && step > activeStep

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

  // Results tab (locked until diagnosis) — shown for all case layouts
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
      title={debriefLocked ? debriefLockedReason : undefined}
    >
      <span className="flex w-full min-w-0 items-center justify-center gap-1.5 text-center">
        {sectionCompletion.debrief && (
          <CheckIcon className="shrink-0 text-emerald-600 dark:text-emerald-400" />
        )}
        <span className="truncate">Results</span>
      </span>
    </button>
  )

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
