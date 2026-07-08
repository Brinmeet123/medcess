import type { Scenario } from '@/data/scenarios'
import type { GuidedReasoningConfig } from '@/types/guidedReasoning'
import type { ClinicalFeedbackReport, ClinicalRubric200, PerformanceLevel } from '@/types/debrief'
import { scoreGuidedReasoning } from '@/lib/guidedReasoningScoring'

export type MedacademyCardioInput = {
  scenario: Scenario
  viewedClinicalDataSections?: string[]
  differentialDxIds: string[]
  finalDxId?: string | null
  guidedReasoningAnswers?: Record<string, { selectedIds: string[]; submitted: boolean }>
}

const STEMI_DX_IDS = new Set(['stemi', 'nstemi'])

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function performanceLevelFromScore150(total: number): PerformanceLevel {
  if (total >= 135) return 'Excellent'
  if (total >= 120) return 'Good'
  if (total >= 100) return 'Fair'
  if (total >= 75) return 'Needs Improvement'
  return 'Poor'
}

function scoreGuidedReasoningSection(
  config: GuidedReasoningConfig | undefined,
  answers: Record<string, { selectedIds: string[]; submitted: boolean }> | undefined
): { score: number; max: number; completed: number; total: number; missed: string[] } {
  if (!config) {
    return { score: 0, max: 55, completed: 0, total: 0, missed: ['Complete Guided Reasoning questions.'] }
  }

  const result = scoreGuidedReasoning(config, answers ?? {})
  const scaledScore = Math.round((result.totalScore / result.maxScore) * 55)
  const missed: string[] = []

  if (result.completedCount < result.totalQuestions) {
    missed.push(
      `Complete all Guided Reasoning questions (${result.completedCount}/${result.totalQuestions} submitted).`
    )
  }

  for (const question of config.questions) {
    const answer = answers?.[question.id]
    if (!answer?.submitted) {
      missed.push(`Guided Reasoning: ${question.prompt}`)
    }
  }

  return {
    score: clamp(scaledScore, 0, 55),
    max: 55,
    completed: result.completedCount,
    total: result.totalQuestions,
    missed: missed.slice(0, 6),
  }
}

function scoreCardioClinicalDataReview(viewedSections: string[]): {
  score: number
  hit: string[]
  missed: string[]
} {
  let score = 0
  const hit: string[] = []
  const missed: string[] = []
  const viewed = new Set(viewedSections)

  if (viewed.has('presentation')) {
    score += 14
    hit.push('Reviewed Presentation section')
  } else {
    missed.push('Reviewed Presentation section')
  }

  if (viewed.has('vital-signs')) {
    score += 12
    hit.push('Reviewed Vital Signs section')
  } else {
    missed.push('Reviewed Vital Signs section')
  }

  if (viewed.has('ecg')) {
    score += 14
    hit.push('Reviewed ECG (EKG) Results section')
  } else {
    missed.push('Reviewed ECG (EKG) Results section')
  }

  if (viewed.has('lab-values')) {
    score += 15
    hit.push('Reviewed Lab Values section')
  } else {
    missed.push('Reviewed Lab Values section')
  }

  return { score: clamp(score, 0, 55), hit, missed }
}

function scoreCardioDiagnosis(input: MedacademyCardioInput): { score: number; notes: string[] } {
  const { differentialDxIds, finalDxId } = input
  let score = 0
  const notes: string[] = []

  const hasStemiDdx = differentialDxIds.some((id) => STEMI_DX_IDS.has(id))
  if (hasStemiDdx) {
    score += 10
    notes.push('Included STEMI or acute MI in differential.')
  }

  if (finalDxId === 'stemi') {
    score += 20
    notes.push('Correct final diagnosis: Acute ST-elevation myocardial infarction (STEMI).')
  } else if (finalDxId === 'nstemi') {
    score += 12
    notes.push('NSTEMI is related but ST elevation on ECG favors STEMI in this case.')
  }

  return { score: clamp(score, 0, 30), notes }
}

function scoreCardioReasoning(input: MedacademyCardioInput): { score: number; notes: string[] } {
  const { finalDxId } = input
  let score = 0
  const notes: string[] = []

  if (finalDxId === 'stemi') {
    score += 10
    notes.push('Final diagnosis matches the ECG and rising cardiac markers.')
  } else if (finalDxId === 'nstemi') {
    score += 5
    notes.push('Consider why ST elevation makes STEMI more likely than NSTEMI here.')
  }

  return { score: clamp(score, 0, 10), notes }
}

export function computeMedacademyCardioScore(input: MedacademyCardioInput): {
  rubric: ClinicalRubric200
  feedback: ClinicalFeedbackReport
  maxScore: 150
  guidedReasoningScore: number
  guidedReasoningMax: number
} {
  const guided = scoreGuidedReasoningSection(
    input.scenario.guidedReasoning,
    input.guidedReasoningAnswers
  )
  const rawGuided = input.scenario.guidedReasoning
    ? scoreGuidedReasoning(input.scenario.guidedReasoning, input.guidedReasoningAnswers ?? {})
    : { totalScore: 0, maxScore: 100, completedCount: 0, totalQuestions: 0 }

  const clinicalData = scoreCardioClinicalDataReview(input.viewedClinicalDataSections ?? [])
  const diagnosis = scoreCardioDiagnosis(input)
  const reasoning = scoreCardioReasoning(input)

  const patientInterview = guided.score
  const diagnosticTesting = clinicalData.score
  const finalDiagnosis = diagnosis.score
  const clinicalReasoning = reasoning.score
  const total = patientInterview + diagnosticTesting + clinicalReasoning + finalDiagnosis

  const rubric: ClinicalRubric200 = {
    patientInterview,
    diagnosticTesting,
    clinicalReasoning,
    finalDiagnosis,
    total,
    performanceLevel: performanceLevelFromScore150(total),
  }

  const feedback: ClinicalFeedbackReport = {
    rubric,
    interview: {
      askedCorrectly:
        rawGuided.completedCount > 0
          ? [`Completed ${rawGuided.completedCount}/${rawGuided.totalQuestions} Guided Reasoning questions`]
          : [],
      missedImportant: guided.missed,
      irrelevantOrLowValue: [],
    },
    testing: {
      correctlyOrdered: clinicalData.hit,
      missedEssential: clinicalData.missed,
      unnecessary: [],
    },
    idealInterviewQuestions: [
      'Guided Reasoning: connect chest pain pattern to heart emergency',
      'Guided Reasoning: interpret ECG ST-segment elevation',
      'Guided Reasoning: review serial troponin and CK-MB trends',
      'Guided Reasoning: identify cardiovascular risk factors',
    ],
    idealWorkup: {
      essential: [
        'Review Presentation',
        'Review Vital Signs',
        'Review ECG (EKG) Results',
        'Review Lab Values table',
      ],
      optional: [],
    },
    correctReasoning:
      'This patient presents with crushing retrosternal chest pain (10/10 in intensity) radiating down his left arm and left side of his neck, nausea, light-headedness, shortness of breath, diaphoresis, diffuse bilateral rales, and ECG showing convex ST-segment elevation. He also has major risk factors including hypertension, diabetes, hyperlipidemia, long history of smoking cigarettes, and family history of heart disease. Serial labs show Troponin I/T rising from 0.8 ng/mL at the initial draw to >100 ng/mL at 6 hours post initial draw, along with major increases in Creatine Kinase and CK-MB. Together, these findings strongly support acute myocardial infarction, specifically STEMI.',
    correctDiagnosis: 'Acute ST-elevation myocardial infarction (STEMI)',
    diagnosisKeyEvidence: [
      'Crushing retrosternal chest pain (10/10) radiating to left arm and neck',
      'Nausea, light-headedness, and shortness of breath',
      'Diaphoresis and diffuse bilateral rales',
      'ECG reveals convex ST-segment elevation',
      'Troponin I/T rises from 0.8 ng/mL to >100 ng/mL',
      'Creatine Kinase and CK-MB rise significantly over time',
      'Hypertension, diabetes, hyperlipidemia, smoking, and family history of heart disease',
      'Blood Pressure: 90/60 mmHg',
    ],
    areasForImprovement: [
      ...guided.missed.map((m) => `Guided Reasoning: ${m}`),
      ...clinicalData.missed.map((m) => `Clinical Data: ${m}.`),
    ].slice(0, 8),
  }

  return {
    rubric,
    feedback,
    maxScore: 150,
    guidedReasoningScore: rawGuided.totalScore,
    guidedReasoningMax: rawGuided.maxScore,
  }
}

export function isMedacademyCardioScenario(scenarioId: string): boolean {
  return scenarioId === 'medacademy-cardio-elephant-on-chest'
}

export function isStemiFinalDiagnosis(finalDxId?: string | null): boolean {
  return finalDxId === 'stemi'
}
