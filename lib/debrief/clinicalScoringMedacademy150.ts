import type { Scenario } from '@/data/scenarios'
import { diagnosisCatalog } from '@/data/diagnosisCatalog'
import type { ClinicalFeedbackReport, ClinicalRubric200, PerformanceLevel } from '@/types/debrief'
import { topicLikelyAsked } from './debriefRules'

export type Medacademy150Input = {
  scenario: Scenario
  doctorBlob: string
  orderedTests: string[]
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

function scoreTests(
  orderedTests: string[],
  doctorBlob: string
): { score: number; hit: string[]; missed: string[] } {
  let score = 0
  const hit: string[] = []
  const missed: string[] = []

  const ctOrdered = orderedTests.some((t) => ['ct_chest', 'ct_angiogram_chest'].includes(t))
  if (ctOrdered) {
    score += 10
    hit.push('CT scan / CT Chest review')
  } else {
    missed.push('CT scan / CT Chest review')
  }

  const peRecognized =
    ctOrdered ||
    topicLikelyAsked(doctorBlob, 'pe ruled out') ||
    topicLikelyAsked(doctorBlob, 'pulmonary embolism ruled')
  if (peRecognized) {
    score += 5
    hit.push('Recognized PE was ruled out')
  } else {
    missed.push('Recognized PE was ruled out')
  }

  if (orderedTests.includes('lung_mass_biopsy')) {
    score += 12
    hit.push('Biopsy of lung mass')
  } else {
    missed.push('Biopsy of lung mass')
  }

  if (orderedTests.some((t) => ['ebus_lymph_node', 'lymph_node_biopsy'].includes(t))) {
    score += 8
    hit.push('Lymph node biopsy / EBUS')
  } else {
    missed.push('Lymph node biopsy / EBUS')
  }

  if (orderedTests.includes('pet_scan')) {
    score += 7
    hit.push('PET scan')
  } else {
    missed.push('PET scan')
  }

  if (orderedTests.includes('mri_brain')) {
    score += 6
    hit.push('Brain MRI')
  } else {
    missed.push('Brain MRI')
  }

  if (orderedTests.some((t) => ['bone_scan', 'mri_spine'].includes(t))) {
    score += 4
    hit.push('Bone scan / spine imaging')
  } else {
    missed.push('Bone scan / spine imaging')
  }

  if (orderedTests.includes('cbc') || orderedTests.includes('cmp')) {
    score += 3
    hit.push('CBC/CMP baseline labs')
  } else {
    missed.push('CBC/CMP baseline labs')
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
    finalDxId &&
    (LUNG_CANCER_DX_IDS.has(finalDxId) || finalDxId === 'lung_cancer')
  if (finalCorrect) {
    score += 5
    notes.push('Correct final diagnosis.')
  }

  return { score: clamp(score, 0, 35), notes }
}

function scoreReasoning(input: Medacademy150Input): { score: number; notes: string[] } {
  const { doctorBlob, orderedTests, finalDxId } = input
  let score = 0
  const notes: string[] = []

  if (
    finalDxId !== 'pe' &&
    (topicLikelyAsked(doctorBlob, 'pe ruled out') ||
      topicLikelyAsked(doctorBlob, 'pulmonary embolism') ||
      orderedTests.some((t) => ['ct_chest', 'ct_angiogram_chest'].includes(t)))
  ) {
    score += 4
    notes.push('Explains why PE is not the final diagnosis.')
  }

  const biopsyOrdered = orderedTests.includes('lung_mass_biopsy')
  if (biopsyOrdered || topicLikelyAsked(doctorBlob, 'biopsy')) {
    score += 4
    notes.push('Explains why biopsy is needed.')
  }

  const stagingOrdered = orderedTests.some((t) =>
    ['pet_scan', 'mri_brain', 'ebus_lymph_node', 'lymph_node_biopsy', 'bone_scan', 'mri_spine'].includes(t)
  )
  if (stagingOrdered || topicLikelyAsked(doctorBlob, 'staging') || topicLikelyAsked(doctorBlob, 'spread')) {
    score += 4
    notes.push('Explains why staging is needed.')
  }

  if (
    orderedTests.some((t) => ['ct_chest', 'ct_angiogram_chest'].includes(t)) ||
    topicLikelyAsked(doctorBlob, 'ct') ||
    topicLikelyAsked(doctorBlob, 'mass')
  ) {
    score += 3
    notes.push('Explains the role of CT findings.')
  }

  return { score: clamp(score, 0, 15), notes }
}

export function computeMedacademy150Score(input: Medacademy150Input): {
  rubric: ClinicalRubric200
  feedback: ClinicalFeedbackReport
  maxScore: 150
} {
  const interview = scoreInterview(input.doctorBlob)
  const tests = scoreTests(input.orderedTests, input.doctorBlob)
  const diagnosis = scoreDiagnosis(input)
  const reasoning = scoreReasoning(input)

  const patientInterview = interview.score
  const diagnosticTesting = tests.score
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
      correctlyOrdered: tests.hit,
      missedEssential: tests.missed,
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
        'Review CT chest / CTA (PE ruled out; right infrahilar mass and subcarinal nodes)',
        'Biopsy of lung mass',
        'Lymph node biopsy / EBUS',
        'PET scan for staging',
        'Brain MRI for neurologic symptoms',
        'Bone scan / spine imaging if bone involvement suspected',
        'CBC and CMP baseline labs',
      ],
      optional: ['Pulmonary function tests if surgery considered'],
    },
    correctReasoning:
      'This case starts with shortness of breath and chest pain during hospitalization, so pulmonary embolism was considered. However, the PE was ruled out. The major finding is the right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm. The 65-70 pack year smoking history, hoarseness, headache, changes in mentation/coordination, and chronic low back pain make lung cancer with possible spread a major concern. Biopsy is needed to confirm malignancy and classify the tumor type, while staging studies such as PET scan, brain MRI, and lymph node sampling help determine spread.',
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
      ...tests.missed.map((m) => `Tests: consider ${m.toLowerCase()}.`),
    ].slice(0, 8),
  }

  return { rubric, feedback, maxScore: 150 }
}
