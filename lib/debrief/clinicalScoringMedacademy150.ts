import type { Scenario } from '@/data/scenarios'
import type { ClinicalFeedbackReport, ClinicalRubric200, PerformanceLevel } from '@/types/debrief'
import { topicLikelyAsked } from './debriefRules'

export type Medacademy150Input = {
  scenario: Scenario
  doctorBlob: string
  viewedClinicalDataSections?: string[]
  differentialDxIds: string[]
  finalDxId?: string | null
}

const LUNG_CANCER_DX_IDS = new Set([
  'lung_cancer',
  'non_small_cell_lung_cancer',
  'small_cell_lung_cancer',
])

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

function scoreInterview(blob: string): { score: number; asked: string[]; missed: string[] } {
  const checks: Array<{ label: string; points: number; patterns: string[] }> = [
    { label: 'Smoking history', points: 10, patterns: ['smok', 'cigarette', 'tobacco', 'pack'] },
    { label: 'Hoarseness', points: 7, patterns: ['hoarse', 'raspy', 'voice'] },
    { label: 'Weight loss', points: 5, patterns: ['weight loss', 'lost weight', 'losing weight'] },
    { label: 'Hemoptysis', points: 5, patterns: ['hemoptysis', 'cough blood', 'blood in sputum', 'coughing blood'] },
    { label: 'Chronic low back pain', points: 5, patterns: ['back pain', 'low back', 'chronic back'] },
    { label: 'Headache', points: 5, patterns: ['headache', 'head pain'] },
    { label: 'Mentation/coordination', points: 5, patterns: ['confusion', 'coordination', 'mentation'] },
    { label: 'Family history', points: 3, patterns: ['family history', 'family cancer', 'cancer in family'] },
  ]

  let score = 0
  const asked: string[] = []
  const missed: string[] = []

  for (const check of checks) {
    const hit = check.patterns.some((p) => topicLikelyAsked(blob, p))
    if (hit) {
      score += check.points
      asked.push(check.label)
    } else {
      missed.push(check.label)
    }
  }

  return { score: clamp(score, 0, 45), asked, missed }
}

function scoreClinicalDataReview(
  viewedSections: string[],
  doctorBlob: string
): { score: number; hit: string[]; missed: string[] } {
  let score = 0
  const hit: string[] = []
  const missed: string[] = []
  const viewed = new Set(viewedSections)
  const imagingReviewed = viewed.has('imaging')

  if (imagingReviewed) {
    score += 12
    hit.push('Reviewed Imaging section')
  } else {
    missed.push('Reviewed Imaging section')
  }

  if (
    imagingReviewed ||
    topicLikelyAsked(doctorBlob, 'pe ruled out') ||
    topicLikelyAsked(doctorBlob, 'pulmonary embolism ruled')
  ) {
    score += 8
    hit.push('Recognized "The PE was ruled out."')
  } else {
    missed.push('Recognized "The PE was ruled out."')
  }

  if (
    imagingReviewed ||
    topicLikelyAsked(doctorBlob, 'infrahilar') ||
    topicLikelyAsked(doctorBlob, '3.1 cm')
  ) {
    score += 10
    hit.push('Recognized right infrahilar mass of 3.1 cm')
  } else {
    missed.push('Recognized right infrahilar mass of 3.1 cm')
  }

  if (
    imagingReviewed ||
    topicLikelyAsked(doctorBlob, 'subcarinal') ||
    topicLikelyAsked(doctorBlob, '1.2 cm')
  ) {
    score += 8
    hit.push('Recognized subcarinal lymph nodes measuring 1.2 cm')
  } else {
    missed.push('Recognized subcarinal lymph nodes measuring 1.2 cm')
  }

  if (viewed.has('hpi')) {
    score += 6
    hit.push('Reviewed History of Present Illness')
  } else {
    missed.push('Reviewed History of Present Illness')
  }

  if (viewed.has('physical-exam')) {
    score += 5
    hit.push('Reviewed Physical Examination')
  } else {
    missed.push('Reviewed Physical Examination')
  }

  if (viewed.has('pmh')) {
    score += 3
    hit.push('Reviewed Past Medical History')
  } else {
    missed.push('Reviewed Past Medical History')
  }

  if (viewed.has('family-history')) {
    score += 3
    hit.push('Reviewed Family History')
  } else {
    missed.push('Reviewed Family History')
  }

  return { score: clamp(score, 0, 55), hit, missed }
}

function scoreDiagnosis(input: Medacademy150Input): { score: number; notes: string[] } {
  const { differentialDxIds, finalDxId, doctorBlob } = input
  let score = 0
  const notes: string[] = []

  const hasLungCancerDdx = differentialDxIds.some((id) => LUNG_CANCER_DX_IDS.has(id))
  if (hasLungCancerDdx) {
    score += 10
    notes.push('Included lung cancer/lung carcinoma in differential.')
  }

  if (
    topicLikelyAsked(doctorBlob, 'infrahilar') ||
    topicLikelyAsked(doctorBlob, 'lung mass') ||
    topicLikelyAsked(doctorBlob, 'mass')
  ) {
    score += 5
    notes.push('Recognized right infrahilar mass is concerning.')
  }

  if (
    topicLikelyAsked(doctorBlob, 'subcarinal') ||
    topicLikelyAsked(doctorBlob, 'lymph') ||
    topicLikelyAsked(doctorBlob, 'node')
  ) {
    score += 6
    notes.push('Recognized subcarinal lymph nodes may suggest nodal involvement.')
  }

  if (topicLikelyAsked(doctorBlob, 'smok') || topicLikelyAsked(doctorBlob, 'pack')) {
    score += 5
    notes.push('Connected smoking history to lung cancer risk.')
  }

  if (
    topicLikelyAsked(doctorBlob, 'headache') ||
    topicLikelyAsked(doctorBlob, 'coordination') ||
    topicLikelyAsked(doctorBlob, 'mentation')
  ) {
    score += 4
    notes.push('Recognized neuro symptoms may suggest possible spread.')
  }

  const finalCorrect =
    finalDxId && (LUNG_CANCER_DX_IDS.has(finalDxId) || finalDxId === 'lung_cancer')
  if (finalCorrect) {
    score += 5
    notes.push('Correct final diagnosis.')
  }

  return { score: clamp(score, 0, 35), notes }
}

function scoreReasoning(input: Medacademy150Input): { score: number; notes: string[] } {
  const { doctorBlob, finalDxId } = input
  let score = 0
  const notes: string[] = []

  if (
    finalDxId !== 'pe' &&
    (topicLikelyAsked(doctorBlob, 'pe ruled out') ||
      topicLikelyAsked(doctorBlob, 'pulmonary embolism'))
  ) {
    score += 4
    notes.push('Explains why PE is not the final diagnosis.')
  }

  if (
    topicLikelyAsked(doctorBlob, 'biopsy') ||
    topicLikelyAsked(doctorBlob, 'staging') ||
    topicLikelyAsked(doctorBlob, 'pet') ||
    topicLikelyAsked(doctorBlob, 'spread')
  ) {
    score += 4
    notes.push('Explains why biopsy/staging would be needed next.')
  }

  if (
    topicLikelyAsked(doctorBlob, 'ct') ||
    topicLikelyAsked(doctorBlob, 'mass') ||
    topicLikelyAsked(doctorBlob, 'infrahilar')
  ) {
    score += 4
    notes.push('Explains why the CT finding matters.')
  }

  const concernFactors = ['smok', 'hoarse', 'headache', 'coordination', 'mentation', 'back pain']
  if (concernFactors.filter((p) => topicLikelyAsked(doctorBlob, p)).length >= 2) {
    score += 3
    notes.push(
      'Explains how smoking history, hoarseness, headache, mentation/coordination changes, and chronic low back pain affect concern level.'
    )
  }

  return { score: clamp(score, 0, 15), notes }
}

export function computeMedacademy150Score(input: Medacademy150Input): {
  rubric: ClinicalRubric200
  feedback: ClinicalFeedbackReport
  maxScore: 150
} {
  const interview = scoreInterview(input.doctorBlob)
  const clinicalData = scoreClinicalDataReview(input.viewedClinicalDataSections ?? [], input.doctorBlob)
  const diagnosis = scoreDiagnosis(input)
  const reasoning = scoreReasoning(input)

  const patientInterview = interview.score
  const diagnosticTesting = clinicalData.score
  const clinicalReasoning = reasoning.score
  const finalDiagnosis = diagnosis.score
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
      askedCorrectly: interview.asked,
      missedImportant: interview.missed,
      irrelevantOrLowValue: [],
    },
    testing: {
      correctlyOrdered: clinicalData.hit,
      missedEssential: clinicalData.missed,
      unnecessary: [],
    },
    idealInterviewQuestions: [
      'Smoking history (pack-years)',
      'Hoarseness or voice changes',
      'Hemoptysis',
      'Weight loss',
      'Chronic low back pain',
      'Headache',
      'Mentation/coordination changes',
      'Family history of cancer',
    ],
    idealWorkup: {
      essential: [
        'Review Imaging (CT already completed — PE ruled out; right infrahilar mass and subcarinal nodes)',
        'Review History of Present Illness',
        'Review Physical Examination',
        'Review Past Medical History',
        'Review Family History',
        'Review Figure 1 CT image',
      ],
      optional: [],
    },
    correctReasoning:
      'This case starts with shortness of breath and chest pain during hospitalization, so pulmonary embolism was considered. However, the PE was ruled out. The major finding is the right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm. The 65-70 pack year smoking history, hoarseness, headache, changes in mentation/coordination, and chronic low back pain make lung cancer with possible spread a major concern. Biopsy and staging would be appropriate next steps.',
    correctDiagnosis:
      'Primary lung cancer / lung carcinoma with concern for nodal involvement and possible metastatic disease.',
    diagnosisKeyEvidence: [
      '65-70 pack year smoking history',
      '3.1 cm right infrahilar mass',
      'Subcarinal lymph nodes measuring 1.2 cm',
      'Hoarseness for two weeks',
      'Headache and changes in mentation/coordination',
      'Chronic low back pain',
      'PE ruled out',
    ],
    areasForImprovement: [
      ...interview.missed.map((m) => `Interview: ask about ${m.toLowerCase()}.`),
      ...clinicalData.missed.map((m) => `Clinical Data: ${m}.`),
    ].slice(0, 8),
  }

  return { rubric, feedback, maxScore: 150 }
}
