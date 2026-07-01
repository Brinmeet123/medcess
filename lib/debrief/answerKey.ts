import type { Scenario } from '@/data/scenarios'
import { diagnosisCatalog } from '@/data/diagnosisCatalog'
import type { ScenarioAnswerKey, ScenarioDebriefConfig } from '@/types/debrief'

function dxName(dxId: string): string {
  return diagnosisCatalog.find((d) => d.id === dxId)?.name ?? dxId
}

/** Resolve a full answer key from explicit fields or legacy debrief config + scenario data. */
export function resolveScenarioAnswerKey(
  scenario: Scenario,
  config: ScenarioDebriefConfig
): ScenarioAnswerKey {
  const essentialInterview =
    config.essentialInterviewQuestions ??
    config.expectedInterviewQuestions ??
    config.keyHistoryQuestions

  const optionalInterview = config.optionalInterviewQuestions ?? []

  const irrelevantInterview = config.irrelevantInterviewQuestions ?? []

  const essentialTests = config.essentialTests ?? config.criticalTests

  const optionalTests =
    config.optionalTests ??
    (scenario.testOverrides
      ?.filter((t) => t.yield === 'helpful')
      .map((t) => t.testId) ??
      [])

  const unnecessaryTests = config.unnecessaryTests ?? []

  const correctDiagnosisId = scenario.finalDxId
  const correctDiagnosis =
    config.correctDiagnosis ??
    (correctDiagnosisId ? dxName(correctDiagnosisId) : 'Unknown')

  const acceptableDiagnoses =
    config.acceptableDiagnoses ??
    (scenario.dxOverrides
      ?.filter((d) => d.yield === 'reasonable')
      .map((d) => dxName(d.dxId)) ??
      [])

  const expectedDifferential =
    config.expectedDifferential ??
    (scenario.dxOverrides
      ?.filter(
        (d) =>
          d.yield === 'correct' ||
          d.yield === 'reasonable' ||
          d.yield === 'dangerous-miss'
      )
      .map((d) => dxName(d.dxId)) ??
      [])

  const keyEvidence = config.keyEvidence ?? config.mustRecognizeFindings ?? []

  const redFlags = config.redFlags ?? scenario.patientPersona.redFlags ?? []

  const idealReasoning =
    config.idealReasoning ??
    buildIdealReasoningFallback(config)

  const diagnosisExplanation =
    config.diagnosisExplanation ?? config.correctDiagnosisExplanation ?? []

  return {
    essentialInterviewQuestions: essentialInterview,
    optionalInterviewQuestions: optionalInterview,
    irrelevantInterviewQuestions: irrelevantInterview,
    essentialTests,
    optionalTests,
    unnecessaryTests,
    correctDiagnosis,
    correctDiagnosisId,
    acceptableDiagnoses,
    expectedDifferential,
    keyEvidence,
    redFlags,
    idealReasoning,
    diagnosisExplanation,
  }
}

function buildIdealReasoningFallback(config: ScenarioDebriefConfig): string {
  const parts: string[] = []
  for (const line of config.correctDiagnosisExplanation.slice(0, 2)) {
    const t = line.trim()
    if (t) parts.push(t)
  }
  for (const row of config.differentialComparison.slice(0, 3)) {
    parts.push(`${row.diagnosis} is less likely because ${row.whyLessLikely}`)
  }
  return parts.join(' ')
}
