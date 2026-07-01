import type { ClinicalRubric200, DebriefScoreBreakdown } from '@/types/debrief'

export type { ClinicalRubric200 }

/** Map legacy 0–5 subscores to a 200-point rubric (used only as fallback). */
export function computeRubric200FromLegacy(sb: DebriefScoreBreakdown): ClinicalRubric200 {
  const patientInterview = Math.round(((sb.history + sb.exam) / 10) * 60)
  const clinicalReasoning = Math.round(sb.reasoning * 10)
  const finalDiagnosis = Math.round(sb.diagnosis * 6)
  const diagnosticTesting = Math.round(((sb.testing + sb.efficiency) / 10) * 60)
  const total = Math.min(
    200,
    patientInterview + diagnosticTesting + clinicalReasoning + finalDiagnosis
  )
  return {
    patientInterview,
    diagnosticTesting,
    clinicalReasoning,
    finalDiagnosis,
    total,
    performanceLevel:
      total >= 180
        ? 'Excellent'
        : total >= 160
          ? 'Good'
          : total >= 130
            ? 'Fair'
            : total >= 100
              ? 'Needs Improvement'
              : 'Poor',
  }
}
