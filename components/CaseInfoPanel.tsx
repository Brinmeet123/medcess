'use client'

import type { CaseInfoContent, CaseVocabEntry, ScenarioDifficulty } from '@/data/scenarios'
import MedacademyVocabHighlight from './MedacademyVocabHighlight'

type Props = {
  content: CaseInfoContent
  title: string
  subtitle?: string
  difficulty: ScenarioDifficulty
  vocab?: CaseVocabEntry[]
  showVocabButton?: boolean
  onStartInterview?: () => void
  onReviewClinicalData?: () => void
  onViewFigure?: () => void
  onReviewVocab?: () => void
  hideHeader?: boolean
}

function Badge({ children, tone = 'brand' }: { children: React.ReactNode; tone?: 'brand' | 'level' }) {
  const tones = {
    brand:
      'bg-primary-100 text-primary-900 border-primary-200/80 dark:bg-primary-900/40 dark:text-primary-200 dark:border-primary-700/50',
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
  vocab = [],
  showVocabButton = false,
  onStartInterview,
  onReviewClinicalData,
  onViewFigure,
  onReviewVocab,
  hideHeader = false,
}: Props) {
  const highlight =
    vocab.length > 0 ? (
      <MedacademyVocabHighlight text={content.introduction} vocab={vocab} caseTitle={title} />
    ) : (
      content.introduction
    )

  return (
    <div className="case-panel !border-0 !bg-transparent !p-0 !shadow-none">
      <div className="mx-auto max-w-3xl space-y-6">
        {!hideHeader ? (
          <header className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm dark:border-[#14345C] dark:from-[#071A33] dark:to-[#0a1f3d]">
            <div className="mb-4 flex flex-wrap gap-2">
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
        ) : null}

        <section className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-[#14345C] dark:bg-[#0a1f3d]">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">Case Snapshot</h2>
          <p className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]">{highlight}</p>
          {content.figureCaption && onViewFigure ? (
            <button
              type="button"
              onClick={onViewFigure}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
            >
              View Figure 1 in Clinical Data
              <span aria-hidden>→</span>
            </button>
          ) : null}
        </section>

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
          {onReviewClinicalData ? (
            <button
              type="button"
              onClick={onReviewClinicalData}
              className="btn-press flex-1 min-w-[200px] rounded-lg border border-primary-300 bg-white px-6 py-3 text-center text-sm font-semibold text-primary-800 shadow-sm transition hover:bg-primary-50 dark:border-primary-600/50 dark:bg-[#0a1f3d] dark:text-primary-300 dark:hover:bg-primary-950/40 sm:flex-none"
            >
              Review Clinical Data
            </button>
          ) : null}
          {showVocabButton && onReviewVocab ? (
            <button
              type="button"
              onClick={onReviewVocab}
              className="btn-press flex-1 min-w-[200px] rounded-lg border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-[#14345C] dark:bg-[#0a1f3d] dark:text-[#CBD5E1] dark:hover:bg-[#071A33] sm:flex-none"
            >
              Review Vocab
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
