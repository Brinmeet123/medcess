import type { FallbackQA } from '@/lib/presetResponses/types'
import {
  includesNormalizedPhrase,
  normalizeQuestion,
  uniqueQuestionWords,
} from '@/lib/patientDialogue/normalize'
import { topicAliasBoost } from '@/lib/patientDialogue/questionAliases'

export const PRESET_MATCH_THRESHOLD = 5

export function scorePresetQuestion(question: string, qa: FallbackQA): number {
  const normalized = normalizeQuestion(question)
  let score = 0

  for (const pattern of qa.patterns || []) {
    const np = normalizeQuestion(pattern)
    if (!np) continue
    if (normalized === np) {
      score += 100
      continue
    }
    if (includesNormalizedPhrase(normalized, pattern)) {
      score += 12 + Math.min(Math.floor(np.length / 4), 18)
    }
  }

  const questionWords = new Set(uniqueQuestionWords(normalized))
  for (const keyword of qa.keywords || []) {
    const nk = normalizeQuestion(keyword)
    if (nk && questionWords.has(nk)) {
      score += 3
    }
  }

  score += topicAliasBoost(normalized, qa.id)
  return score
}

export type PresetMatchResult = {
  answer: string
  score: number
  qaId: string | null
  matched: boolean
}

export function pickBestPresetAnswer(
  question: string,
  qaList: FallbackQA[],
  defaultAnswer: string,
  threshold = PRESET_MATCH_THRESHOLD
): PresetMatchResult {
  let bestQA: FallbackQA | null = null
  let bestScore = 0

  for (const qa of qaList) {
    const score = scorePresetQuestion(question, qa)
    if (score > bestScore) {
      bestScore = score
      bestQA = qa
    }
  }

  if (!bestQA || bestScore < threshold) {
    return {
      answer: defaultAnswer,
      score: bestScore,
      qaId: null,
      matched: false,
    }
  }

  return {
    answer: bestQA.answer,
    score: bestScore,
    qaId: bestQA.id,
    matched: true,
  }
}
