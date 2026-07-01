/**
 * Deterministic debrief types — no AI required for the main flow.
 */

export type DebriefScoreBreakdown = {
  history: number
  exam: number
  testing: number
  reasoning: number
  diagnosis: number
  efficiency: number
}

export type DebriefInput = {
  scenarioId: string
  finalDiagnosis?: string
  finalDxId?: string | null
  differential?: string[]
  askedHistoryQuestions: string[]
  completedExamItems: string[]
  orderedTests: string[]
  keyFindingsDiscovered: string[]
  missedCriticalFindings: string[]
  unnecessaryTests: string[]
  correctDiagnosis: string
  expectedDifferentials: string[]
  redFlagsIdentified: string[]
  redFlagsMissed: string[]
  scoreBreakdown: DebriefScoreBreakdown
  /** Raw doctor chat text (lowercased) for keyword rules */
  doctorChatBlob: string
  /** Must-not-miss dx ids missing from DDx */
  missingMustNotMissDxIds: string[]
  differentialLength: number
  /** Doctor messages flagged as unrelated to the clinical interview */
  offTopicQuestions: string[]
}

/** Post-scenario clinical score out of 200. */
export type ClinicalRubric200 = {
  patientInterview: number
  diagnosticTesting: number
  clinicalReasoning: number
  finalDiagnosis: number
  total: number
  performanceLevel: PerformanceLevel
  /** Set when a guessing/process cap lowered the raw total. */
  scoreCapApplied?: number
}

export type PerformanceLevel =
  | 'Excellent'
  | 'Good'
  | 'Fair'
  | 'Needs Improvement'
  | 'Poor'

export type ClinicalFeedbackReport = {
  rubric: ClinicalRubric200
  interview: {
    askedCorrectly: string[]
    missedImportant: string[]
    irrelevantOrLowValue: string[]
  }
  testing: {
    correctlyOrdered: string[]
    missedEssential: string[]
    unnecessary: Array<{ name: string; reason?: string }>
  }
  idealInterviewQuestions: string[]
  idealWorkup: {
    essential: string[]
    optional: string[]
  }
  correctReasoning: string
  correctDiagnosis: string
  diagnosisKeyEvidence: string[]
  areasForImprovement: string[]
}

/** @deprecated Legacy 100-point rubric — use ClinicalRubric200. */
export type DebriefRubric100 = {
  historyTaking: number
  clinicalReasoning: number
  diagnosticAccuracy: number
  efficiencyAndQuestionSelection: number
  total: number
}

export type DebriefOutput = {
  summary: string
  strengths: string[]
  missedOpportunities: string[]
  /** Teaching-focused steps (2–4 concise bullets). */
  correctApproach: string[]
  /** One short actionable line for the next run. */
  improvementTip: string
  /** Legacy shape; kept for optional polish pipeline compatibility. */
  diagnosticReasoning: string[]
  nextStepAdvice: string[]
  clinicalPearls: string[]
  vocabToReview: string[]
}

/** Per-scenario configuration for rule-based debrief (see data/debriefConfigs.ts). */
export type ScenarioDebriefConfig = {
  keyHistoryQuestions: string[]
  keyExamItems: string[]
  criticalTests: string[]
  unnecessaryTests: string[]
  mustRecognizeFindings: string[]
  commonMisses: string[]
  correctDiagnosisExplanation: string[]
  differentialComparison: { diagnosis: string; whyLessLikely: string }[]
  clinicalPearls: string[]
  vocabTerms: string[]
  /** Extended answer-key fields for 200-point clinical scoring */
  expectedInterviewQuestions?: string[]
  essentialInterviewQuestions?: string[]
  optionalInterviewQuestions?: string[]
  irrelevantInterviewQuestions?: string[]
  essentialTests?: string[]
  optionalTests?: string[]
  correctDiagnosis?: string
  acceptableDiagnoses?: string[]
  expectedDifferential?: string[]
  keyEvidence?: string[]
  redFlags?: string[]
  idealReasoning?: string
  diagnosisExplanation?: string[]
}

/** Internal answer key used by the 200-point scoring engine. */
export type ScenarioAnswerKey = {
  essentialInterviewQuestions: string[]
  optionalInterviewQuestions: string[]
  irrelevantInterviewQuestions: string[]
  essentialTests: string[]
  optionalTests: string[]
  unnecessaryTests: string[]
  correctDiagnosis: string
  correctDiagnosisId?: string
  acceptableDiagnoses: string[]
  expectedDifferential: string[]
  keyEvidence: string[]
  redFlags: string[]
  idealReasoning: string
  diagnosisExplanation: string[]
}

/** API + UI shape: deterministic debrief plus legacy assessment fields. */
export type DeterministicAssessment = {
  overallRating: PerformanceLevel
  summary: string
  strengths: string[]
  areasForImprovement: string[]
  diagnosisFeedback: string
  missedKeyHistoryPoints: string[]
  testSelectionFeedback: string
  sectionRatings: {
    history: PerformanceLevel | 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor'
    exam: PerformanceLevel | 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor'
    tests: PerformanceLevel | 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor'
    diagnosis: PerformanceLevel | 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor'
    communication: PerformanceLevel | 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor'
  }
  totalScore: number
  totalScorePercentage: number
  maxScore: number
  /** Canonical score out of 200. */
  rubric200: ClinicalRubric200
  /** @deprecated Use rubric200 */
  rubric100?: DebriefRubric100
  /** Full educational feedback report */
  clinicalFeedback: ClinicalFeedbackReport
  scoreBreakdown: {
    history: number
    exam: number
    tests: number
    diagnosis: number
    communication: number
  }
  /** Structured debrief sections */
  debriefStructured: DebriefOutput
  /** Source marker for clients */
  source: 'deterministic' | 'deterministic-polished'
}
