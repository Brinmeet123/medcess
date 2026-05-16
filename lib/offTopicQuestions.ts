import type { Scenario } from '@/data/scenarios'

/** Strong signals that a doctor question is unrelated to a clinical interview. */
const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(gauss|jordan elimination|calculus|algebra|geometry|homework|equation|theorem|integral|derivative)\b/i,
  /\b(recipe|ingredients?|chipotle|mcdonald|burger king|how to cook|how do you make)\b/i,
  /\b(football|basketball|baseball|soccer|nfl|nba|world cup|super bowl)\b/i,
  /\b(movie|netflix|celebrity|tiktok|instagram|youtube)\b/i,
  /\b(politics|election|president|democrat|republican)\b/i,
  /\b(what is the capital of|who won the|trivia|random fact)\b/i,
  /\b(explain|define|what is)\s+(the\s+)?(matrix|photosynthesis|black hole|speed of light)\b/i,
]

/** Interview-adjacent phrases — never treat as off-topic even if short. */
const CLINICAL_INTERVIEW_HINTS: RegExp[] = [
  /\b(pain|hurt|feel|symptom|when|where|how long|worse|better|medication|allerg|history|family|smoke|drink|fever|cough|breath|nausea|vomit|dizzy|weak|swell|rash|urin|bowel|appetite|sleep|stress|anxiety|depress|injur|fall|trauma|blood pressure|heart|chest|head|neck|abdomen|stomach|leg|arm)\b/i,
  /\b(brought you|what happened|tell me more|anything else|review of systems|past medical|social history)\b/i,
  /\b(what is going on|what's going on|how are you feeling|can you describe|what brought you)\b/i,
]

export type OffTopicMatch = {
  question: string
  reason: string
}

function normalizeQuestion(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

/** True when the question is clearly unrelated to taking a patient history. */
export function isOffTopicDoctorQuestion(
  question: string,
  _scenario?: Scenario
): boolean {
  const q = normalizeQuestion(question)
  if (q.length < 8) return false

  const lower = q.toLowerCase()

  if (CLINICAL_INTERVIEW_HINTS.some((re) => re.test(lower))) {
    return false
  }

  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(q)) {
      return true
    }
  }

  return false
}

export function getOffTopicPatientReply(patientName?: string, seed = ''): string {
  const variants = [
    "Excuse me, doctor — why are you asking me that? I'm here because I'm not feeling well.",
    "I'm sorry… I don't understand what that has to do with why I came in. Can we talk about what's going on with me?",
    "Doctor, that's kind of a strange question. I'm worried about my symptoms — can we focus on that?",
    "Um… I'm not sure how to answer that. I thought you were going to ask about my health.",
  ]
  const key = `${patientName || 'patient'}:${seed}`
  return variants[Math.abs(hashString(key)) % variants.length]
}

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0
  }
  return h
}

export function findOffTopicQuestionsFromChat(
  chat: Array<{ role: string; content: string }> | undefined,
  scenario?: Scenario
): OffTopicMatch[] {
  if (!chat?.length) return []

  const matches: OffTopicMatch[] = []
  for (const msg of chat) {
    if (msg.role !== 'doctor' && msg.role !== 'user') continue
    const question = normalizeQuestion(msg.content)
    if (!question) continue
    if (isOffTopicDoctorQuestion(question, scenario)) {
      const preview = question.length > 72 ? `${question.slice(0, 69)}…` : question
      matches.push({
        question: preview,
        reason: 'Unrelated to the clinical interview',
      })
    }
  }
  return matches
}
