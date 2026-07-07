export type GuidedReasoningQuestionType = 'multiple-choice' | 'check-all'

export type GuidedReasoningOption = {
  id: string
  text: string
}

export type GuidedReasoningQuestion = {
  id: string
  sectionId: string
  type: GuidedReasoningQuestionType
  prompt: string
  options: GuidedReasoningOption[]
  correctOptionIds: string[]
  feedback: string
  hint?: string
  points?: number
}

export type GuidedReasoningSection = {
  id: string
  title: string
  maxPoints: number
}

export type GuidedReasoningLearningGoal =
  | { type: 'text'; text: string }
  | { type: 'organelles'; intro: string; items: string[] }

export type GuidedReasoningConfig = {
  intro: string
  learningGoals: GuidedReasoningLearningGoal[]
  sections: GuidedReasoningSection[]
  questions: GuidedReasoningQuestion[]
}
