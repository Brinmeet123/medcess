/**
 * Topic aliases so similar history questions map to the same preset row
 * (e.g. "Do you smoke?" / "Smoking history?" / "Have you ever smoked?").
 */
export type TopicAlias = {
  /** Extra patterns checked against the normalized doctor question */
  patterns: string[]
  keywords: string[]
  /** Fallback QA ids that receive a boost when this topic is detected */
  qaIds: string[]
}

export const QUESTION_TOPIC_ALIASES: TopicAlias[] = [
  {
    patterns: ['smoke', 'smoking', 'tobacco', 'cigarette', 'ever smoked', 'smoking history', 'do you use cigarettes'],
    keywords: ['smoke', 'smoking', 'tobacco', 'cigarette', 'cigarettes', 'nicotine', 'vape', 'vaping'],
    qaIds: ['smoking'],
  },
  {
    patterns: ['family history', 'heart disease in family', 'heart attack in family', 'anyone in your family'],
    keywords: ['family', 'father', 'mother', 'sibling', 'genetic', 'runs in'],
    qaIds: ['family-history'],
  },
  {
    patterns: ['allerg', 'allergic', 'drug allergy', 'medication allergy'],
    keywords: ['allergy', 'allergies', 'allergic', 'reaction'],
    qaIds: ['allergies'],
  },
  {
    patterns: ['medication', 'medicines', 'meds', 'what do you take', 'prescription'],
    keywords: ['medication', 'medications', 'medicine', 'meds', 'pills', 'prescription'],
    qaIds: ['medications', 'medical-history'],
  },
  {
    patterns: ['medical condition', 'past medical', 'health problems', 'medical history', 'any conditions'],
    keywords: ['medical', 'history', 'conditions', 'diabetes', 'hypertension', 'pressure'],
    qaIds: ['past-medical', 'medical-history', 'medical-history'],
  },
  {
    patterns: ['shortness of breath', 'trouble breathing', 'hard to breathe', 'sob'],
    keywords: ['shortness', 'breath', 'breathing', 'winded', 'dyspnea'],
    qaIds: ['shortness-breath', 'associated-sob-nausea-sweat'],
  },
  {
    patterns: ['when did', 'how long', 'when did this start', 'onset'],
    keywords: ['when', 'start', 'started', 'onset', 'began', 'long'],
    qaIds: ['onset'],
  },
  {
    patterns: ['where', 'location', 'point to', 'where does it hurt'],
    keywords: ['where', 'location', 'located', 'point'],
    qaIds: ['location'],
  },
  {
    patterns: ['radiate', 'spread', 'go anywhere', 'travel'],
    keywords: ['radiate', 'spread', 'travel', 'arm', 'jaw', 'back'],
    qaIds: ['radiation'],
  },
  {
    patterns: ['nausea', 'nauseous', 'throw up', 'vomit'],
    keywords: ['nausea', 'nauseous', 'vomit', 'sick'],
    qaIds: ['nausea', 'associated-sob-nausea-sweat'],
  },
  {
    patterns: ['fever', 'temperature', 'chills'],
    keywords: ['fever', 'temperature', 'chills', 'hot'],
    qaIds: ['fever'],
  },
  {
    patterns: ['alcohol', 'drink alcohol', 'how much do you drink'],
    keywords: ['alcohol', 'drink', 'drinking', 'beer', 'wine'],
    qaIds: ['social'],
  },
]

export function topicAliasBoost(normalizedQuestion: string, qaId: string): number {
  let boost = 0
  for (const alias of QUESTION_TOPIC_ALIASES) {
    if (!alias.qaIds.includes(qaId)) continue
    const topicHit =
      alias.patterns.some((p) => normalizedQuestion.includes(normalizeInline(p))) ||
      alias.keywords.some((k) => {
        const words = new Set(normalizedQuestion.split(' '))
        return words.has(k)
      })
    if (topicHit) boost = Math.max(boost, 18)
  }
  return boost
}

function normalizeInline(s: string): string {
  return s.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()
}
