import type { GuidedReasoningConfig, GuidedReasoningQuestion } from '@/types/guidedReasoning'

const POINTS_PER_QUESTION = 5

export function isAnswerCorrect(question: GuidedReasoningQuestion, selectedIds: string[]): boolean {
  const correct = [...question.correctOptionIds].sort()
  const selected = [...selectedIds].sort()
  if (correct.length !== selected.length) return false
  return correct.every((id, i) => id === selected[i])
}

export function scoreGuidedReasoning(
  config: GuidedReasoningConfig,
  answers: Record<string, { selectedIds: string[]; submitted: boolean }>
): {
  totalScore: number
  maxScore: number
  completedCount: number
  totalQuestions: number
  sectionScores: Record<string, { earned: number; max: number; completed: number; total: number }>
} {
  const maxScore = config.questions.length * POINTS_PER_QUESTION
  let totalScore = 0
  let completedCount = 0

  const sectionScores: Record<
    string,
    { earned: number; max: number; completed: number; total: number }
  > = {}

  for (const section of config.sections) {
    sectionScores[section.id] = { earned: 0, max: section.maxPoints, completed: 0, total: 0 }
  }

  for (const question of config.questions) {
    const section = sectionScores[question.sectionId]
    if (section) section.total += 1

    const answer = answers[question.id]
    if (!answer?.submitted) continue

    completedCount += 1
    if (section) section.completed += 1

    const points = question.points ?? POINTS_PER_QUESTION
    if (isAnswerCorrect(question, answer.selectedIds)) {
      totalScore += points
      if (section) section.earned += points
    }
  }

  return {
    totalScore,
    maxScore,
    completedCount,
    totalQuestions: config.questions.length,
    sectionScores,
  }
}

export function isGuidedReasoningComplete(
  config: GuidedReasoningConfig,
  answers: Record<string, { selectedIds: string[]; submitted: boolean }>
): boolean {
  return config.questions.every((q) => answers[q.id]?.submitted)
}
