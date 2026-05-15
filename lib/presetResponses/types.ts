export type FallbackQA = {
  id: string
  answer: string
  patterns?: string[]
  keywords?: string[]
}

export type FallbackScenario = {
  key: string
  titleMatchers: string[]
  complaintMatchers: string[]
  qa: FallbackQA[]
  defaultAnswer: string
}
