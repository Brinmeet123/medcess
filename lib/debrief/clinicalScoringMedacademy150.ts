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

const METASTATIC_DX_IDS = new Set(['metastatic_cancer', 'lung_cancer', 'non_small_cell_lung_cancer'])

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
    { label: 'Hoarseness or voice change', points: 7, patterns: ['hoarse', 'raspy', 'voice'] },
    { label: 'Hemoptysis', points: 5, patterns: ['hemoptysis', 'cough blood', 'blood in sputum', 'coughing blood'] },
    { label: 'Weight loss', points: 5, patterns: ['weight loss', 'lost weight', 'losing weight'] },
    {
      label: 'Headache or neurologic symptoms',
      points: 8,
      patterns: ['headache', 'confusion', 'coordination', 'mentation', 'dizzy', 'weakness', 'neuro'],
    },
    { label: 'Back pain or bone pain', points: 5, patterns: ['back pain', 'bone pain', 'spine', 'fracture'] },
    { label: 'Family history of cancer', points: 3, patterns: ['family history', 'family cancer', 'cancer in family'] },
    { label: 'Past medical history', points: 2, patterns: ['medical history', 'past medical', 'hypertension', 'hypothyroid', 'colon surgery', 'gi bleed'] },
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

function scoreTests(orderedTests: string[]): { score: number; hit: string[]; missed: string[] } {
  const checks: Array<{ label: string; points: number; testIds: string[] }> = [
    { label: 'CT chest / CTA review', points: 10, testIds: ['ct_chest', 'ct_angiogram_chest'] },
    { label: 'Lung or lymph node biopsy', points: 15, testIds: ['lung_mass_biopsy', 'ebus_lymph_node', 'lymph_node_biopsy'] },
    { label: 'PET scan for staging', points: 10, testIds: ['pet_scan'] },
    { label: 'Brain MRI for neuro symptoms', points: 8, testIds: ['mri_brain'] },
    { label: 'Spine imaging / bone scan', points: 5, testIds: ['bone_scan'] },
    { label: 'Baseline CBC / CMP', points: 4, testIds: ['cbc', 'cmp'] },
    { label: 'Pulmonary function testing', points: 3, testIds: ['pft'] },
  ]

  let score = 0
  const hit: string[] = []
  const missed: string[] = []

  for (const check of checks) {
    const ordered = check.testIds.some((id) => orderedTests.includes(id))
    if (ordered) {
      score += check.points
      hit.push(check.label)
    } else {
      missed.push(check.label)
    }
  }

  // CBC/CMP combined cap at 4
  if (orderedTests.includes('cbc') && orderedTests.includes('cmp') && score > 0) {
    // already counted once if either hit — adjust: only add full 4 if at least one ordered
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
    notes.push('Included lung cancer in the differential.')
  }

  const peRuledOut =
    !finalDxId ||
    finalDxId !== 'pe' ||
    topicLikelyAsked(doctorBlob, 'pe ruled out') ||
    topicLikelyAsked(doctorBlob, 'pulmonary embolism ruled')
  if (finalDxId !== 'pe') {
    score += 5
    notes.push('Did not select pulmonary embolism as the final diagnosis (PE was ruled out on CT).')
  } else if (!peRuledOut) {
    notes.push('PE was ruled out on imaging — it should not be the final diagnosis.')
  }

  const stagingDx = differentialDxIds.some((id) =>
    ['lung_cancer', 'non_small_cell_lung_cancer', 'lymphoma', 'metastatic_cancer'].includes(id)
  )
  if (stagingDx || topicLikelyAsked(doctorBlob, 'lymph') || topicLikelyAsked(doctorBlob, 'node')) {
    score += 7
    notes.push('Recognized lymph node involvement / staging concern.')
  }

  const metastaticConcern =
    differentialDxIds.some((id) => METASTATIC_DX_IDS.has(id)) ||
    topicLikelyAsked(doctorBlob, 'metast') ||
    topicLikelyAsked(doctorBlob, 'brain') ||
    topicLikelyAsked(doctorBlob, 'bone')
  if (metastaticConcern) {
    score += 7
    notes.push('Recognized possible metastatic disease.')
  }

  const finalCorrect =
    finalDxId &&
    (LUNG_CANCER_DX_IDS.has(finalDxId) ||
      finalDxId === 'lung_cancer' ||
      finalDxId === 'non_small_cell_lung_cancer')
  if (finalCorrect) {
    score += 6
    notes.push('Final diagnosis: lung cancer / lung carcinoma.')
  }

  return { score: clamp(score, 0, 35), notes }
}

function scoreReasoning(input: Medacademy150Input): { score: number; notes: string[] } {
  const { doctorBlob, orderedTests } = input
  let score = 0
  const notes: string[] = []

  if (
    (topicLikelyAsked(doctorBlob, 'smok') || topicLikelyAsked(doctorBlob, 'pack')) &&
    (topicLikelyAsked(doctorBlob, 'mass') || orderedTests.some((t) => ['ct_chest', 'ct_angiogram_chest'].includes(t)))
  ) {
    score += 5
    notes.push('Connected smoking history with the lung mass.')
  }

  if (topicLikelyAsked(doctorBlob, 'hoarse') || topicLikelyAsked(doctorBlob, 'voice')) {
    score += 3
    notes.push('Connected hoarseness to possible local/mediastinal involvement.')
  }

  if (
    (topicLikelyAsked(doctorBlob, 'headache') || topicLikelyAsked(doctorBlob, 'coordination')) &&
    orderedTests.includes('mri_brain')
  ) {
    score += 4
    notes.push('Connected neurologic symptoms to possible brain metastasis and ordered brain MRI.')
  } else if (topicLikelyAsked(doctorBlob, 'headache') || topicLikelyAsked(doctorBlob, 'coordination')) {
    score += 2
    notes.push('Considered neurologic symptoms — brain MRI helps evaluate possible metastasis.')
  }

  const biopsyOrdered = orderedTests.some((t) =>
    ['lung_mass_biopsy', 'ebus_lymph_node', 'lymph_node_biopsy'].includes(t)
  )
  if (biopsyOrdered || topicLikelyAsked(doctorBlob, 'biopsy')) {
    score += 3
    notes.push('Recognized need for tissue biopsy before final classification.')
  }

  return { score: clamp(score, 0, 15), notes }
}

export function computeMedacademy150Score(input: Medacademy150Input): {
  rubric: ClinicalRubric200
  feedback: ClinicalFeedbackReport
  maxScore: 150
} {
  const interview = scoreInterview(input.doctorBlob)
  const tests = scoreTests(input.orderedTests)
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

  const correctName =
    diagnosisCatalog.find((d) => d.id === input.scenario.finalDxId)?.name ??
    'Primary lung cancer, likely non-small cell lung cancer'

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
      'Cough and hemoptysis',
      'Weight loss',
      'Headache, confusion, or coordination changes',
      'Back pain',
      'Past medical and surgical history',
      'Family history of cancer',
    ],
    idealWorkup: {
      essential: [
        'Review CT chest / CTA (PE ruled out; lung mass and nodes seen)',
        'Lung mass biopsy or EBUS lymph node sampling',
        'PET scan for staging',
        'Brain MRI for neurologic symptoms',
        'Bone scan / spine imaging if bone involvement suspected',
      ],
      optional: ['CBC and CMP baseline', 'Pulmonary function tests if surgery considered'],
    },
    correctReasoning:
      'This case begins as a PE workup, but the major finding is an incidental lung mass. Heavy smoking, hoarseness, mediastinal nodes, and systemic symptoms raise concern for lung cancer with possible spread. Tissue biopsy and staging with PET, brain MRI, and nodal sampling are key next steps.',
    correctDiagnosis:
      'Primary lung cancer, likely non-small cell lung cancer, with concern for mediastinal lymph node involvement and possible metastatic disease.',
    diagnosisKeyEvidence: [
      '65–70 pack-year smoking history',
      '3.1 cm right infrahilar lung mass',
      'Enlarged subcarinal lymph nodes',
      'Hoarseness for two weeks',
      'Headache and coordination changes',
      'Chronic back pain and recent hip fracture',
      'PE ruled out on CT angiography',
    ],
    areasForImprovement: [
      ...interview.missed.map((m) => `Interview: ask about ${m.toLowerCase()}.`),
      ...tests.missed.map((m) => `Tests: consider ordering ${m.toLowerCase()}.`),
      ...diagnosis.notes.filter((n) => n.includes('should not')),
    ].slice(0, 8),
  }

  return { rubric, feedback, maxScore: 150 }
}
