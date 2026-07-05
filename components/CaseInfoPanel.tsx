'use client'

import type { CaseInfoContent } from '@/data/scenarios'

type Props = {
  content: CaseInfoContent
}

export default function CaseInfoPanel({ content }: Props) {
  return (
    <div className="case-panel">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">Case Information</h2>

      <section className="mb-6">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1] whitespace-pre-wrap">
          {content.introduction}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">
          History of Present Illness:
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1] whitespace-pre-wrap">
          {content.hpi}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">Past Medical History:</h3>
        <ul className="list-none space-y-1 text-sm text-slate-700 dark:text-[#CBD5E1]">
          {content.pmh.map((item) => (
            <li key={item}>&quot;{item}&quot;</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">Family History:</h3>
        <p className="text-sm text-slate-700 dark:text-[#CBD5E1]">&quot;{content.familyHistory}&quot;</p>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">Physical Examination:</h3>
        <ul className="list-none space-y-2 text-sm text-slate-700 dark:text-[#CBD5E1]">
          {content.physicalExam.map((item) => (
            <li key={item}>&quot;{item}&quot;</li>
          ))}
        </ul>
      </section>

      {content.figureCaption ? (
        <section className="rounded-lg border border-slate-200 dark:border-[#14345C] bg-slate-50 dark:bg-[#071A33] p-4">
          {content.figureImageUrl ? (
            <img
              src={content.figureImageUrl}
              alt={content.figureCaption}
              className="mb-3 max-w-full rounded-md border border-slate-200 dark:border-[#14345C]"
            />
          ) : (
            <div className="mb-3 flex h-40 items-center justify-center rounded-md border border-dashed border-slate-300 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] text-xs text-slate-500 dark:text-slate-400">
              CT image placeholder — see case text for Figure 1 description
            </div>
          )}
          <p className="text-sm italic text-slate-600 dark:text-[#94a3b8]">{content.figureCaption}</p>
        </section>
      ) : null}
    </div>
  )
}
