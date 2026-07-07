'use client'

import { useMemo, useState } from 'react'
import type { GuidedReasoningConfig, GuidedReasoningQuestion } from '@/types/guidedReasoning'
import {
  isAnswerCorrect,
  isGuidedReasoningComplete,
  scoreGuidedReasoning,
} from '@/lib/guidedReasoningScoring'

export type GuidedReasoningAnswerState = {
  selectedIds: string[]
  submitted: boolean
}

type Props = {
  config: GuidedReasoningConfig
  answers: Record<string, GuidedReasoningAnswerState>
  onAnswerChange: (questionId: string, state: GuidedReasoningAnswerState) => void
  onViewResults: () => void
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  summary,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  summary?: string
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-[#071A33]"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">{title}</span>
        <span className="flex items-center gap-3 shrink-0">
          {summary ? (
            <span className="text-xs font-medium text-slate-500 dark:text-[#94a3b8]">{summary}</span>
          ) : null}
          <svg
            className={`h-5 w-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {open ? <div className="border-t border-slate-200/90 dark:border-[#14345C] px-5 py-4">{children}</div> : null}
    </div>
  )
}

function QuestionCard({
  question,
  index,
  answer,
  onAnswerChange,
}: {
  question: GuidedReasoningQuestion
  index: number
  answer?: GuidedReasoningAnswerState
  onAnswerChange: (state: GuidedReasoningAnswerState) => void
}) {
  const [showHint, setShowHint] = useState(false)
  const selectedIds = answer?.selectedIds ?? []
  const submitted = answer?.submitted ?? false
  const correct = submitted && isAnswerCorrect(question, selectedIds)

  const toggleOption = (optionId: string) => {
    if (submitted) return
    if (question.type === 'multiple-choice') {
      onAnswerChange({ selectedIds: [optionId], submitted: false })
      return
    }
    const next = selectedIds.includes(optionId)
      ? selectedIds.filter((id) => id !== optionId)
      : [...selectedIds, optionId]
    onAnswerChange({ selectedIds: next, submitted: false })
  }

  const handleSubmit = () => {
    if (selectedIds.length === 0) return
    onAnswerChange({ selectedIds, submitted: true })
  }

  const optionLabel = (i: number) => String.fromCharCode(65 + i)

  return (
    <div className="rounded-lg border border-slate-200 dark:border-[#14345C] bg-slate-50/60 dark:bg-[#071A33]/60 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
        Question {index + 1}. {question.prompt}
      </p>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          const isSelected = selectedIds.includes(option.id)
          const isCorrectOption = question.correctOptionIds.includes(option.id)
          let optionClasses =
            'flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition'

          if (!submitted) {
            optionClasses += isSelected
              ? ' border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-slate-900 dark:text-[#F8FAFC]'
              : ' border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] text-slate-700 dark:text-[#CBD5E1] hover:border-primary-300'
          } else if (isCorrectOption) {
            optionClasses +=
              ' border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
          } else if (isSelected && !isCorrectOption) {
            optionClasses += ' border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
          } else {
            optionClasses +=
              ' border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] text-slate-500 dark:text-[#94a3b8]'
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleOption(option.id)}
              disabled={submitted}
              className={optionClasses}
            >
              <span className="mt-0.5 shrink-0 font-semibold">{optionLabel(i)}.</span>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedIds.length === 0}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit answer
            </button>
            {question.hint ? (
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="text-sm font-medium text-primary-700 dark:text-primary-300 hover:underline"
              >
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
            ) : null}
          </>
        ) : (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              correct
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
            }`}
          >
            {correct ? 'Correct' : 'Not quite — review the feedback'}
          </span>
        )}
      </div>

      {showHint && !submitted && question.hint ? (
        <p className="mt-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-sm text-amber-900 dark:text-amber-200">
          <span className="font-semibold">Hint: </span>
          {question.hint}
        </p>
      ) : null}

      {submitted ? (
        <p className="mt-3 rounded-lg border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] px-3 py-2 text-sm text-slate-700 dark:text-[#CBD5E1]">
          <span className="font-semibold text-slate-900 dark:text-[#F8FAFC]">Feedback: </span>
          {question.feedback}
        </p>
      ) : null}
    </div>
  )
}

export default function GuidedReasoningPanel({
  config,
  answers,
  onAnswerChange,
  onViewResults,
}: Props) {
  const [learningGoalsOpen, setLearningGoalsOpen] = useState(false)

  const scoring = useMemo(() => scoreGuidedReasoning(config, answers), [config, answers])
  const complete = useMemo(() => isGuidedReasoningComplete(config, answers), [config, answers])

  const questionsBySection = useMemo(() => {
    const map = new Map<string, GuidedReasoningQuestion[]>()
    for (const section of config.sections) {
      map.set(
        section.id,
        config.questions.filter((q) => q.sectionId === section.id)
      )
    }
    return map
  }, [config])

  let questionOffset = 0

  return (
    <div className="case-panel">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-2">Guided Reasoning</h2>
      <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-[#CBD5E1]">{config.intro}</p>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-primary-200 dark:border-primary-800/50 bg-primary-50/50 dark:bg-primary-950/20 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
            Guided Reasoning score
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-[#F8FAFC]">
            {scoring.totalScore}
            <span className="text-lg font-semibold text-slate-500 dark:text-[#94a3b8]">/{scoring.maxScore}</span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-[#14345C] bg-slate-50 dark:bg-[#071A33] px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">
            Questions completed
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-[#F8FAFC]">
            {scoring.completedCount}
            <span className="text-lg font-semibold text-slate-500 dark:text-[#94a3b8]">
              /{scoring.totalQuestions}
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-[#14345C] bg-slate-50 dark:bg-[#071A33] px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">
            Total progress
          </p>
          <p className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-[#14345C]">
            <span
              className="block h-full rounded-full bg-primary-600 transition-all duration-300"
              style={{
                width: `${scoring.totalQuestions ? (scoring.completedCount / scoring.totalQuestions) * 100 : 0}%`,
              }}
            />
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="rounded-xl border border-slate-200/90 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] overflow-hidden">
          <button
            type="button"
            onClick={() => setLearningGoalsOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-[#071A33]"
            aria-expanded={learningGoalsOpen}
          >
            <span className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">Learning Goals</span>
            <svg
              className={`h-5 w-5 text-slate-500 transition-transform ${learningGoalsOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {learningGoalsOpen ? (
            <div className="border-t border-slate-200/90 dark:border-[#14345C] px-5 py-4">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-[#CBD5E1]">
                {config.learningGoals.map((goal, idx) => {
                  if (goal.type === 'organelles') {
                    return (
                      <li key={idx}>
                        {goal.intro}
                        <ul className="mt-1 list-disc space-y-0.5 pl-5">
                          {goal.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </li>
                    )
                  }
                  return <li key={idx}>{goal.text}</li>
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        {config.sections.map((section) => {
          const sectionQuestions = questionsBySection.get(section.id) ?? []
          const sectionScore = scoring.sectionScores[section.id]
          const startIndex = questionOffset
          questionOffset += sectionQuestions.length

          return (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              defaultOpen={section.id === 'case-clues'}
              summary={
                sectionScore
                  ? `${sectionScore.completed}/${sectionScore.total} · ${sectionScore.earned}/${sectionScore.max} pts`
                  : undefined
              }
            >
              <div className="space-y-4">
                {sectionQuestions.map((question, i) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={startIndex + i}
                    answer={answers[question.id]}
                    onAnswerChange={(state) => onAnswerChange(question.id, state)}
                  />
                ))}
              </div>
            </CollapsibleSection>
          )
        })}
      </div>

      {complete ? (
        <div className="mt-8 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20 p-6 text-center">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300">
            Guided Reasoning Complete
          </h3>
          <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
            You are ready to make your diagnosis.
          </p>
          <button
            type="button"
            onClick={onViewResults}
            className="mt-4 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Continue to Diagnosis
          </button>
        </div>
      ) : null}
    </div>
  )
}
