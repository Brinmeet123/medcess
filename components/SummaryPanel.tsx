'use client'

import Link from 'next/link'
import { Scenario } from '@/data/scenarios'
import type { RubricBreakdown } from '@/lib/scoring'
import type { ClinicalFeedbackReport, ClinicalRubric200 } from '@/types/debrief'
import VocabText from './VocabText'
import VocabContextBlock from './VocabContextBlock'
import { shouldShowVocabTab, isMedacademyCase } from '@/lib/scenarioVocab'
import { vocab, getVocabTerm } from '@/data/vocab'
import { APP_NAME } from '@/lib/branding'

type DebriefStructured = {
  summary: string
  strengths: string[]
  missedOpportunities: string[]
  correctApproach?: string[]
  improvementTip?: string
  diagnosticReasoning: string[]
  nextStepAdvice: string[]
  clinicalPearls: string[]
  vocabToReview: string[]
}

type AssessmentResult = {
  overallRating: string
  summary: string
  strengths: string[]
  areasForImprovement: string[]
  diagnosisFeedback: string
  missedKeyHistoryPoints: string[]
  testSelectionFeedback: string
  totalScore?: number
  maxScore?: number
  rubric200?: ClinicalRubric200
  clinicalFeedback?: ClinicalFeedbackReport
  debriefStructured?: DebriefStructured
  source?: string
}

type Props = {
  scenario: Scenario
  assessment: AssessmentResult
  clickedTerms?: string[]
  savedTerms?: string[]
  onTermClick?: (term: string) => void
  onTermSave?: (term: string) => void
  scenarioScore?: {
    score: number
    level: string
    feedback: string
    rubric: RubricBreakdown
  }
}

const ratingColors: Record<string, string> = {
  Excellent:
    'bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/50',
  Good: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
  Fair: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/50',
  'Needs Improvement':
    'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50',
  Poor: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/50',
}

function FeedbackList({
  title,
  items,
  emptyText,
  variant = 'default',
}: {
  title: string
  items: string[]
  emptyText: string
  variant?: 'correct' | 'missed' | 'unnecessary' | 'default'
}) {
  const titleColors = {
    correct: 'text-emerald-800 dark:text-emerald-300',
    missed: 'text-amber-800 dark:text-amber-300',
    unnecessary: 'text-rose-800 dark:text-rose-300',
    default: 'text-slate-800 dark:text-[#F8FAFC]',
  }

  return (
    <div>
      <h4 className={`mb-2 text-sm font-semibold ${titleColors[variant]}`}>{title}</h4>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-[#94a3b8]">{emptyText}</p>
      ) : (
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-[#CBD5E1]">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ScoreCard({
  rubric,
  levelLabel,
  capApplied,
  maxScore = 200,
  scoringProfile,
  hasGuidedReasoning,
}: {
  rubric: ClinicalRubric200
  levelLabel: string
  capApplied?: number
  maxScore?: number
  scoringProfile?: Scenario['scoringProfile']
  hasGuidedReasoning?: boolean
}) {
  const rows =
    scoringProfile === 'medacademy-150' && hasGuidedReasoning
      ? [
          { label: 'Guided Reasoning', value: rubric.patientInterview, max: 55 },
          { label: 'Clinical Data Review', value: rubric.diagnosticTesting, max: 55 },
          { label: 'Diagnosis', value: rubric.finalDiagnosis, max: 30 },
          { label: 'Clinical Reasoning', value: rubric.clinicalReasoning, max: 10 },
        ]
      : scoringProfile === 'medacademy-150'
        ? [
            { label: 'Patient Interview', value: rubric.patientInterview, max: 45 },
            { label: 'Clinical Data Review', value: rubric.diagnosticTesting, max: 55 },
            { label: 'Diagnosis', value: rubric.finalDiagnosis, max: 35 },
            { label: 'Clinical Reasoning Explanation', value: rubric.clinicalReasoning, max: 15 },
          ]
      : [
          { label: 'Patient Interview', value: rubric.patientInterview, max: 60 },
          { label: 'Diagnostic Testing', value: rubric.diagnosticTesting, max: 60 },
          { label: 'Clinical Reasoning', value: rubric.clinicalReasoning, max: 50 },
          { label: 'Final Diagnosis', value: rubric.finalDiagnosis, max: 30 },
        ]

  return (
    <div className="mb-6 rounded-xl border border-teal-200 dark:border-teal-800/50 bg-gradient-to-br from-teal-50 to-slate-50 dark:from-[#071A33] dark:to-[#0a1f3d] p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-teal-900 dark:text-teal-300">
        Overall Clinical Score
      </h3>
      <p className="text-4xl font-bold tabular-nums text-slate-900 dark:text-[#F8FAFC]">
        {rubric.total}
        <span className="text-2xl font-semibold text-slate-600 dark:text-[#CBD5E1]">/{maxScore}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-teal-900 dark:text-teal-300">
        Performance Level: {levelLabel}
      </p>
      {capApplied != null ? (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
          Score capped at {capApplied}/{maxScore} because the clinical process did not support the final
          answer.
        </p>
      ) : null}
      <p className="mb-3 mt-4 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">
        Score Breakdown
      </p>
      <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#CBD5E1]">
        {rows.map((row) => (
          <li key={row.label} className="flex justify-between gap-4 tabular-nums">
            <span>{row.label}</span>
            <span>
              {row.value} / {row.max}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SummaryPanel({
  scenario,
  assessment,
  clickedTerms = [],
  savedTerms = [],
  onTermClick,
  onTermSave,
  scenarioScore,
}: Props) {
  const cf = assessment.clinicalFeedback
  const rubric = assessment.rubric200 ?? (scenarioScore
    ? {
        patientInterview: scenarioScore.rubric.patientInterview,
        diagnosticTesting: scenarioScore.rubric.diagnosticTesting,
        clinicalReasoning: scenarioScore.rubric.clinicalReasoning,
        finalDiagnosis: scenarioScore.rubric.finalDiagnosis,
        total: scenarioScore.score,
        performanceLevel: scenarioScore.level as ClinicalRubric200['performanceLevel'],
      }
    : undefined)

  const ds = assessment.debriefStructured
  const debriefContext = [
    assessment.summary,
    cf?.correctReasoning,
    cf?.areasForImprovement.join('\n'),
    ds?.improvementTip,
  ]
    .filter(Boolean)
    .join('\n')

  const missedTopics = [
    ...(cf?.interview.missedImportant ?? assessment.missedKeyHistoryPoints),
    ...(cf?.testing.missedEssential ?? []),
    ...(cf?.areasForImprovement ?? assessment.areasForImprovement),
  ]
    .join(' ')
    .toLowerCase()

  const vocabKeywordMap: Record<string, string[]> = {
    smoking: ['pack year', 'smoking'],
    hoarseness: ['hoarseness', 'raspy'],
    hemoptysis: ['hemoptysis'],
    'weight loss': ['weight loss'],
    headache: ['headache', 'mentation'],
    coordination: ['coordination', 'mentation'],
    mentation: ['mentation', 'coordination'],
    'back pain': ['chronic low back pain', 'bone scan'],
    family: ['family history'],
    biopsy: ['biopsy', 'mass'],
    pet: ['PET scan', 'staging'],
    'brain mri': ['Brain MRI', 'headache'],
    'lymph node': ['subcarinal lymph nodes', 'EBUS'],
    ct: ['CT scan', 'right infrahilar mass'],
    pe: ['pulmonary embolism', 'PE'],
    staging: ['PET scan', 'staging'],
  }

  const caseVocabRecommendations = shouldShowVocabTab(scenario)
    ? (scenario.caseVocab
        ?.filter((entry) => {
          for (const [keyword, terms] of Object.entries(vocabKeywordMap)) {
            if (missedTopics.includes(keyword) && terms.some((t) => t.toLowerCase() === entry.term.toLowerCase())) {
              return true
            }
          }
          return missedTopics.split(/\W+/).some(
            (word) =>
              word.length > 4 &&
              (entry.term.toLowerCase().includes(word) || entry.whyItMatters.toLowerCase().includes(word))
          )
        })
        .slice(0, 8)
        .map((e) => e.term) ?? [])
    : []

  const recommendedTerms =
    caseVocabRecommendations.length > 0
      ? caseVocabRecommendations
      : vocab
          .filter((term) => {
            const relatedToMissed = (cf?.interview.missedImportant ?? assessment.missedKeyHistoryPoints).some(
              (point) =>
                point.toLowerCase().includes(term.term.toLowerCase()) ||
                term.tags.some((tag) => point.toLowerCase().includes(tag))
            )
            const isImportant = term.tags.includes('red-flag') || term.tags.includes('cardiac')
            return (relatedToMissed || isImportant) && !savedTerms.includes(term.term)
          })
          .slice(0, 5)
          .map((term) => term.term)

  const improvementItems = cf?.areasForImprovement.length
    ? cf.areasForImprovement
    : assessment.areasForImprovement

  const isMedacademy = isMedacademyCase(scenario)

  const correctDiagnosisSection = cf ? (
    <section className="rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
      <h3 className="mb-3 text-base font-semibold text-emerald-900 dark:text-emerald-300">
        Correct Final Diagnosis
      </h3>
      <p className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
        Correct Diagnosis: {cf.correctDiagnosis}
      </p>
      {cf.diagnosisKeyEvidence.length > 0 ? (
        <div className="mt-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">
            Key Evidence
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-[#CBD5E1]">
            {cf.diagnosisKeyEvidence.map((item, idx) => (
              <li key={idx}>
                <VocabText text={item} onTermClick={onTermClick} onTermSave={onTermSave} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  ) : null

  const clinicalExplanationSection = cf ? (
    <section className="rounded-xl border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] p-5">
      <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
        Short clinical explanation
      </h3>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
        <VocabText text={cf.correctReasoning} onTermClick={onTermClick} onTermSave={onTermSave} />
      </p>
    </section>
  ) : null

  return (
    <div className="case-panel">
      <VocabContextBlock source="debrief" mode="simplify" scenarioId={scenario.id} text={debriefContext}>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">
          Clinical Performance Report
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-[#CBD5E1]">
          {isMedacademy
            ? `${APP_NAME} evaluates your full clinical process — interview, clinical data review, reasoning, and final diagnosis — not just whether you guessed correctly.`
            : `${APP_NAME} evaluates your full clinical process — interview, testing, reasoning, and final diagnosis — not just whether you guessed correctly.`}
        </p>

        {rubric ? (
          <ScoreCard
            rubric={rubric}
            levelLabel={assessment.overallRating}
            capApplied={rubric.scoreCapApplied}
            maxScore={assessment.maxScore ?? 200}
            scoringProfile={scenario.scoringProfile}
            hasGuidedReasoning={Boolean(scenario.guidedReasoning)}
          />
        ) : assessment.totalScore != null ? (
          <div className="mb-6 rounded-xl border border-slate-200 dark:border-[#14345C] bg-slate-50 dark:bg-[#071A33] p-4">
            <p className="text-3xl font-bold tabular-nums">
              {assessment.totalScore}
              <span className="text-xl font-semibold text-slate-600">/{assessment.maxScore ?? 200}</span>
            </p>
          </div>
        ) : null}

        {cf ? (
          <div className="space-y-4">
            {correctDiagnosisSection}

            <section className="rounded-xl border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                Patient Interview
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <FeedbackList
                  title="Asked correctly"
                  items={cf.interview.askedCorrectly}
                  emptyText="No essential history topics clearly covered."
                  variant="correct"
                />
                <FeedbackList
                  title="Missed important questions"
                  items={cf.interview.missedImportant}
                  emptyText="No major history gaps flagged."
                  variant="missed"
                />
                <FeedbackList
                  title="Irrelevant or low-value questions"
                  items={cf.interview.irrelevantOrLowValue}
                  emptyText="No off-topic or low-value questions detected."
                  variant="unnecessary"
                />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                {isMedacademy ? 'Clinical Data Review' : 'Diagnostic Testing'}
              </h3>
              <div className={`grid gap-4 ${isMedacademy ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                <FeedbackList
                  title={isMedacademy ? 'Sections reviewed' : 'Correctly ordered tests'}
                  items={cf.testing.correctlyOrdered}
                  emptyText={
                    isMedacademy
                      ? 'No clinical data sections reviewed yet.'
                      : 'No essential tests ordered.'
                  }
                  variant="correct"
                />
                <FeedbackList
                  title={isMedacademy ? 'Sections missed' : 'Missed essential tests'}
                  items={cf.testing.missedEssential}
                  emptyText={
                    isMedacademy
                      ? 'All important clinical data sections were reviewed.'
                      : 'All essential tests were ordered.'
                  }
                  variant="missed"
                />
                {!isMedacademy ? (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-rose-800 dark:text-rose-300">
                      Unnecessary tests
                    </h4>
                    {cf.testing.unnecessary.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-[#94a3b8]">No unnecessary tests ordered.</p>
                    ) : (
                      <ul className="space-y-2 text-sm text-slate-700 dark:text-[#CBD5E1]">
                        {cf.testing.unnecessary.map((t, idx) => (
                          <li key={idx}>
                            <span className="font-medium">{t.name}</span>
                            {t.reason ? (
                              <span className="text-slate-500 dark:text-[#94a3b8]"> — {t.reason}</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div>
            </section>

            {(cf.idealInterviewQuestions.length > 0 || cf.idealWorkup.essential.length > 0) && (
              <section className="rounded-xl border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                  Ideal approach
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {cf.idealInterviewQuestions.length > 0 ? (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-[#F8FAFC]">
                        Ideal patient interview questions
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-[#CBD5E1]">
                        {cf.idealInterviewQuestions.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {cf.idealWorkup.essential.length > 0 ? (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-[#F8FAFC]">
                        {isMedacademy ? 'Important clinical data sections' : 'Ideal tests'}
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-[#CBD5E1]">
                        {cf.idealWorkup.essential.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </section>
            )}

            {clinicalExplanationSection}

            <section className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/40 dark:bg-amber-950/20 p-5">
              <h3 className="mb-3 text-base font-semibold text-amber-900 dark:text-amber-300">
                Areas for Improvement
              </h3>
              {improvementItems.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-[#CBD5E1]">No major gaps flagged.</p>
              ) : (
                <ul className="list-inside list-disc space-y-1.5 text-sm text-slate-700 dark:text-[#CBD5E1]">
                  {improvementItems.map((area, idx) => (
                    <li key={idx}>
                      <VocabText text={area} onTermClick={onTermClick} onTermSave={onTermSave} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        ) : (
          <div className="mb-4 rounded-lg border border-slate-100 dark:border-[#14345C] bg-slate-50/80 dark:bg-[#071A33] p-3">
            <p className="text-sm text-slate-800 dark:text-[#CBD5E1]">
              <VocabText text={assessment.summary} onTermClick={onTermClick} onTermSave={onTermSave} />
            </p>
          </div>
        )}

        {recommendedTerms.length > 0 ? (
          <div className="mt-6 rounded-lg border border-purple-200 dark:border-purple-800/50 bg-purple-50 dark:bg-[#071A33] p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-[#F8FAFC]">
              Vocabulary connected to missed reasoning points
            </h3>
            {shouldShowVocabTab(scenario) && scenario.caseVocab ? (
              <ul className="space-y-2 text-sm text-slate-700 dark:text-[#CBD5E1]">
                {recommendedTerms.map((termName) => {
                  const entry = scenario.caseVocab?.find(
                    (e) => e.term.toLowerCase() === termName.toLowerCase()
                  )
                  if (!entry) return null
                  return (
                    <li key={termName} className="rounded-md border border-purple-200/60 dark:border-purple-800/40 bg-white/80 dark:bg-[#0a1f3d] px-3 py-2">
                      <span className="font-semibold text-purple-800 dark:text-purple-300">{entry.term}</span>
                      <span className="text-slate-600 dark:text-[#94a3b8]"> — {entry.definition}</span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-2">
                {recommendedTerms.map((term) => {
                  const termData = getVocabTerm(term)
                  return termData ? (
                    <button
                      key={term}
                      type="button"
                      onClick={() => onTermClick?.(term)}
                      className="rounded-md border border-purple-300 dark:border-purple-600 bg-white dark:bg-[#0a1f3d] px-3 py-1 text-sm text-purple-700 dark:text-purple-300"
                    >
                      {termData.display}
                    </button>
                  ) : null
                })}
              </div>
            )}
          </div>
        ) : null}

        {ds?.improvementTip ? (
          <div className="mt-4 rounded-lg border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] p-4 text-sm text-slate-800 dark:text-[#CBD5E1]">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">
              Next step
            </h3>
            <p>
              <VocabText text={ds.improvementTip} onTermClick={onTermClick} onTermSave={onTermSave} />
            </p>
          </div>
        ) : null}

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-primary-200 dark:border-[#14345C] bg-primary-50/60 dark:bg-[#071A33] p-5">
            <p className="font-semibold text-slate-900 dark:text-[#F8FAFC]">What do you want to do next?</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/scenarios/${scenario.id}`
                }}
                className="btn-press flex-1 rounded-lg border border-primary-300 dark:border-primary-600 bg-white dark:bg-[#0a1f3d] px-4 py-3 text-center text-sm font-semibold text-primary-800 dark:text-primary-300 shadow-sm transition hover:bg-primary-50 dark:hover:bg-primary-950/40"
              >
                Try again to improve score
              </button>
              <Link
                href="/scenarios"
                className="btn-press flex-1 rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
              >
                Pick another case
              </Link>
            </div>
          </div>
        </div>
      </VocabContextBlock>
    </div>
  )
}
