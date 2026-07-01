import type { Scenario } from '@/data/scenarios'
import { testCatalog } from '@/data/testCatalog'
import { resolveDx } from '@/lib/dxEngine'
import { resolveTest } from '@/lib/testEngine'
import type {
  ClinicalFeedbackReport,
  ClinicalRubric200,
  PerformanceLevel,
  ScenarioAnswerKey,
} from '@/types/debrief'
import {
  filterAskedTopics,
  missedKeyHistoryTopics,
  topicLikelyAsked,
} from './debriefRules'

export type ClinicalScoringInput = {
  scenario: Scenario
  answerKey: ScenarioAnswerKey
  doctorBlob: string
  doctorMessageCount: number
  orderedTests: string[]
  differentialDetailed?: Array<{ dxId: string; note?: string }>
  finalDxId?: string | null
  offTopicQuestions: string[]
  missingMustNotMissDxIds: string[]
  redFlagsMissed: string[]
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function testDisplayName(testId: string): string {
  return testCatalog.find((t) => t.id === testId)?.name ?? testId
}

export function performanceLevelFromScore(total: number): PerformanceLevel {
  if (total >= 180) return 'Excellent'
  if (total >= 160) return 'Good'
  if (total >= 130) return 'Fair'
  if (total >= 100) return 'Needs Improvement'
  return 'Poor'
}

function scorePatientInterview(input: ClinicalScoringInput): number {
  const { answerKey, doctorBlob, offTopicQuestions } = input
  const essential = answerKey.essentialInterviewQuestions
  const optional = answerKey.optionalInterviewQuestions
  const redFlags = answerKey.redFlags

  const essentialAsked = filterAskedTopics(doctorBlob, essential).length
  const optionalAsked = optional.length
    ? filterAskedTopics(doctorBlob, optional).length
    : 0
  const redFlagAsked = redFlags.length
    ? filterAskedTopics(doctorBlob, redFlags).length
    : 0

  const essentialRatio = essential.length ? essentialAsked / essential.length : 0
  const optionalRatio = optional.length ? optionalAsked / optional.length : 0
  const redFlagRatio = redFlags.length ? redFlagAsked / redFlags.length : 1

  let score =
    essentialRatio * 45 +
    optionalRatio * 10 +
    redFlagRatio * 5

  const irrelevantAsked = answerKey.irrelevantInterviewQuestions.filter((q) =>
    topicLikelyAsked(doctorBlob, q)
  ).length
  const irrelevantPenalty = Math.min(15, irrelevantAsked * 3 + offTopicQuestions.length * 4)
  score -= irrelevantPenalty

  const missedEssential = essential.length - essentialAsked
  if (missedEssential > 0 && essential.length > 0) {
    score -= Math.min(12, (missedEssential / essential.length) * 12)
  }

  const missedRedFlags = redFlags.length - redFlagAsked
  if (missedRedFlags > 0 && redFlags.length > 0) {
    score -= Math.min(10, (missedRedFlags / redFlags.length) * 10)
  }

  return Math.round(clamp(score, 0, 60))
}

function scoreDiagnosticTesting(input: ClinicalScoringInput): number {
  const { answerKey, orderedTests, scenario } = input
  const essential = answerKey.essentialTests
  const optional = answerKey.optionalTests
  const unnecessarySet = new Set(answerKey.unnecessaryTests)

  const essentialHit = essential.filter((t) => orderedTests.includes(t)).length
  const optionalHit = optional.filter((t) => orderedTests.includes(t)).length
  const unnecessaryOrdered = orderedTests.filter((t) => {
    if (unnecessarySet.has(t)) return true
    try {
      return resolveTest(scenario, t).yield === 'inappropriate'
    } catch {
      return false
    }
  })

  const essentialRatio = essential.length ? essentialHit / essential.length : 0
  const optionalRatio = optional.length ? optionalHit / optional.length : 0

  let score = essentialRatio * 42 + optionalRatio * 8

  const unnecessaryPenalty = Math.min(22, unnecessaryOrdered.length * 5)
  score -= unnecessaryPenalty

  const firstEssentialIdx = essential.reduce(
    (best, t) => {
      const idx = orderedTests.indexOf(t)
      if (idx === -1) return best
      return best === -1 ? idx : Math.min(best, idx)
    },
    -1
  )
  const firstUnnecessaryIdx = unnecessaryOrdered.reduce(
    (best, t) => {
      const idx = orderedTests.indexOf(t)
      return best === -1 ? idx : Math.min(best, idx)
    },
    -1
  )
  if (
    firstEssentialIdx >= 0 &&
    firstUnnecessaryIdx >= 0 &&
    firstUnnecessaryIdx < firstEssentialIdx
  ) {
    score -= 6
  }

  const reasonableMax = essential.length + optional.length + 2
  if (orderedTests.length > reasonableMax) {
    score -= Math.min(10, (orderedTests.length - reasonableMax) * 2)
  }

  const missedEssential = essential.length - essentialHit
  if (missedEssential > 0 && essential.length > 0) {
    score -= Math.min(15, (missedEssential / essential.length) * 15)
  }

  return Math.round(clamp(score, 0, 60))
}

function scoreClinicalReasoning(input: ClinicalScoringInput): number {
  const { answerKey, differentialDetailed, missingMustNotMissDxIds, offTopicQuestions } =
    input
  const ddx = differentialDetailed ?? []

  if (ddx.length === 0) return 0

  const expectedNames = new Set(answerKey.expectedDifferential.map((n) => n.toLowerCase()))
  const userDxNames = ddx.map((d) => {
    try {
      return resolveDx(input.scenario, d.dxId).dx.name.toLowerCase()
    } catch {
      return d.dxId.toLowerCase()
    }
  })
  const ddxHits = userDxNames.filter((n) =>
    [...expectedNames].some((e) => n.includes(e) || e.includes(n))
  ).length
  const ddxRatio =
    answerKey.expectedDifferential.length > 0
      ? ddxHits / answerKey.expectedDifferential.length
      : clamp(ddx.length / 4, 0, 1)

  const withNotes = ddx.filter((d) => d.note && d.note.trim().length > 12).length
  const noteRatio = ddx.length ? withNotes / ddx.length : 0
  const avgNoteLen =
    ddx.reduce((sum, d) => sum + (d.note?.trim().length ?? 0), 0) / ddx.length

  let score = ddxRatio * 20 + noteRatio * 18

  if (ddx.length >= 3) score += 4
  if (avgNoteLen >= 25) score += 4
  else if (avgNoteLen < 10) score -= 8

  if (missingMustNotMissDxIds.length > 0) {
    score -= Math.min(15, missingMustNotMissDxIds.length * 6)
  }

  if (offTopicQuestions.length > 0) {
    score -= Math.min(6, offTopicQuestions.length * 2)
  }

  if (withNotes === 0) {
    score = Math.min(score, 12)
  }

  return Math.round(clamp(score, 0, 50))
}

function scoreFinalDiagnosis(input: ClinicalScoringInput): number {
  const { finalDxId, scenario, answerKey } = input
  if (!finalDxId) return 0

  const correctId = answerKey.correctDiagnosisId ?? scenario.finalDxId
  if (correctId && finalDxId === correctId) return 30

  try {
    const resolved = resolveDx(scenario, finalDxId)
    if (resolved.yield === 'correct') return 30
    if (resolved.yield === 'reasonable') return 22
    if (resolved.yield === 'low') return 8
    if (resolved.yield === 'irrelevant') return 3
  } catch {
    /* fall through */
  }

  const acceptable = answerKey.acceptableDiagnoses.map((n) => n.toLowerCase())
  const finalName = resolveDx(scenario, finalDxId).dx.name.toLowerCase()
  if (acceptable.some((a) => finalName.includes(a) || a.includes(finalName))) {
    return 20
  }

  const inDdx = (input.differentialDetailed ?? []).some((d) => d.dxId === correctId)
  if (inDdx && correctId) return 12

  return 2
}

function applyScoreCaps(
  rubric: Omit<ClinicalRubric200, 'total' | 'performanceLevel' | 'scoreCapApplied'>,
  input: ClinicalScoringInput,
  finalCorrect: boolean
): { total: number; capApplied?: number } {
  let cap = 200
  const { answerKey, doctorMessageCount, redFlagsMissed } = input

  const interviewWeak =
    rubric.patientInterview < 30 ||
    (answerKey.essentialInterviewQuestions.length > 0 &&
      filterAskedTopics(input.doctorBlob, answerKey.essentialInterviewQuestions).length /
        answerKey.essentialInterviewQuestions.length <
        0.4)

  const testingWeak =
    rubric.diagnosticTesting < 24 ||
    answerKey.essentialTests.some((t) => !input.orderedTests.includes(t))

  const barelyInterview =
    doctorMessageCount < 3 || rubric.patientInterview < 18

  const missingKeyTests = answerKey.essentialTests.some(
    (t) => !input.orderedTests.includes(t)
  )

  const littleReasoning =
    rubric.clinicalReasoning < 15 ||
    !(input.differentialDetailed ?? []).some(
      (d) => d.note && d.note.trim().length > 12
    )

  const missedMajorRedFlag = redFlagsMissed.length > 0

  const wrongDx = !finalCorrect
  const strongProcess =
    rubric.patientInterview >= 42 &&
    rubric.diagnosticTesting >= 42 &&
    rubric.clinicalReasoning >= 35

  if (finalCorrect && interviewWeak && testingWeak) cap = Math.min(cap, 120)
  if (barelyInterview) cap = Math.min(cap, 125)
  if (missingKeyTests) cap = Math.min(cap, 135)
  if (finalCorrect && littleReasoning) cap = Math.min(cap, 130)
  if (missedMajorRedFlag) cap = Math.min(cap, 150)
  if (wrongDx && strongProcess) cap = Math.min(cap, 170)

  const raw =
    rubric.patientInterview +
    rubric.diagnosticTesting +
    rubric.clinicalReasoning +
    rubric.finalDiagnosis

  if (raw > cap) {
    return { total: cap, capApplied: cap }
  }
  return { total: raw }
}

function buildUnnecessaryTestReason(
  scenario: Scenario,
  testId: string,
  answerKey: ScenarioAnswerKey
): string | undefined {
  if (!answerKey.unnecessaryTests.includes(testId)) {
    try {
      const resolved = resolveTest(scenario, testId)
      if (resolved.yield === 'inappropriate') {
        return 'Not indicated for this presentation'
      }
    } catch {
      return undefined
    }
    return undefined
  }
  return 'Low yield or unrelated to this case presentation'
}

function buildAreasForImprovement(
  rubric: ClinicalRubric200,
  report: Omit<ClinicalFeedbackReport, 'areasForImprovement' | 'rubric'>
): string[] {
  const areas: string[] = []

  if (report.interview.missedImportant.length > 0) {
    areas.push(
      `Ask more about ${report.interview.missedImportant.slice(0, 2).join(' and ')} to clarify the clinical picture.`
    )
  }
  if (report.interview.irrelevantOrLowValue.length > 0) {
    areas.push(
      'Avoid broad or unrelated history questions — stay focused on symptom onset, progression, and red flags.'
    )
  }
  if (report.testing.missedEssential.length > 0) {
    areas.push(
      `Order essential tests earlier, including ${report.testing.missedEssential.slice(0, 2).join(' and ')}.`
    )
  }
  if (report.testing.unnecessary.length > 0) {
    areas.push(
      'Avoid shotgun testing — order tests that change your differential, not every available panel.'
    )
  }
  if (rubric.clinicalReasoning < 25) {
    areas.push(
      'Support each differential diagnosis with specific evidence from the history and test results.'
    )
  }
  if (rubric.clinicalReasoning < 20) {
    areas.push(
      'Consider dangerous diagnoses before less serious ones, and explain why they are more or less likely.'
    )
  }
  if (rubric.finalDiagnosis < 15 && rubric.patientInterview + rubric.diagnosticTesting < 80) {
    areas.push(
      'A correct guess cannot replace a structured workup — build your diagnosis from interview and testing data.'
    )
  }
  if (rubric.patientInterview < 30) {
    areas.push('Use a systematic history: onset, duration, severity, associated symptoms, and relevant negatives.')
  }

  return [...new Set(areas)].slice(0, 6)
}

export function computeClinicalScore200(
  input: ClinicalScoringInput
): ClinicalFeedbackReport {
  const patientInterview = scorePatientInterview(input)
  const diagnosticTesting = scoreDiagnosticTesting(input)
  const clinicalReasoning = scoreClinicalReasoning(input)
  const finalDiagnosis = scoreFinalDiagnosis(input)

  const correctId = input.answerKey.correctDiagnosisId ?? input.scenario.finalDxId
  const finalCorrect = Boolean(
    input.finalDxId && correctId && input.finalDxId === correctId
  )

  const partialRubric = {
    patientInterview,
    diagnosticTesting,
    clinicalReasoning,
    finalDiagnosis,
  }

  const { total: cappedTotal, capApplied } = applyScoreCaps(partialRubric, input, finalCorrect)

  const rubric: ClinicalRubric200 = {
    ...partialRubric,
    total: cappedTotal,
    performanceLevel: performanceLevelFromScore(cappedTotal),
    scoreCapApplied: capApplied,
  }

  const essential = input.answerKey.essentialInterviewQuestions
  const optional = input.answerKey.optionalInterviewQuestions
  const redFlags = input.answerKey.redFlags

  const askedEssential = filterAskedTopics(input.doctorBlob, essential)
  const askedOptional = filterAskedTopics(input.doctorBlob, optional)
  const missedEssential = missedKeyHistoryTopics(input.doctorBlob, essential)
  const missedRedFlags = missedKeyHistoryTopics(input.doctorBlob, redFlags)

  const irrelevantOrLowValue = [
    ...input.offTopicQuestions,
    ...input.answerKey.irrelevantInterviewQuestions.filter((q) =>
      topicLikelyAsked(input.doctorBlob, q)
    ),
  ]

  const essentialTests = input.answerKey.essentialTests
  const correctlyOrdered = essentialTests
    .filter((t) => input.orderedTests.includes(t))
    .map(testDisplayName)
  const missedEssentialTests = essentialTests
    .filter((t) => !input.orderedTests.includes(t))
    .map(testDisplayName)

  const unnecessaryOrdered = input.orderedTests.filter((t) => {
    if (input.answerKey.unnecessaryTests.includes(t)) return true
    try {
      return resolveTest(input.scenario, t).yield === 'inappropriate'
    } catch {
      return false
    }
  })

  const unnecessary = unnecessaryOrdered.map((testId) => ({
    name: testDisplayName(testId),
    reason: buildUnnecessaryTestReason(input.scenario, testId, input.answerKey),
  }))

  const reportBase = {
    interview: {
      askedCorrectly: [...askedEssential, ...askedOptional],
      missedImportant: [...new Set([...missedEssential, ...missedRedFlags])],
      irrelevantOrLowValue: [...new Set(irrelevantOrLowValue)],
    },
    testing: {
      correctlyOrdered,
      missedEssential: missedEssentialTests,
      unnecessary,
    },
    idealInterviewQuestions: [...essential, ...optional],
    idealWorkup: {
      essential: essentialTests.map(testDisplayName),
      optional: input.answerKey.optionalTests.map(testDisplayName),
    },
    correctReasoning: input.answerKey.idealReasoning,
    correctDiagnosis: input.answerKey.correctDiagnosis,
    diagnosisKeyEvidence: input.answerKey.keyEvidence,
  }

  return {
    rubric,
    ...reportBase,
    areasForImprovement: buildAreasForImprovement(rubric, reportBase),
  }
}
