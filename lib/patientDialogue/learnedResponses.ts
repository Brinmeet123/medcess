import { prisma } from '@/lib/prisma'
import { normalizeQuestion, uniqueQuestionWords } from '@/lib/patientDialogue/normalize'

export type LearnedMatch = {
  response: string
  id: string
  similarity: number
}

/** Exact doctor question only — no fuzzy reuse (prevents wrong repeated answers). */
export async function findExactLearnedPatientResponse(
  scenarioId: string,
  doctorQuestion: string
): Promise<LearnedMatch | null> {
  const normalized = normalizeQuestion(doctorQuestion)
  if (!normalized) return null

  try {
    const exact = await prisma.patientLearnedResponse.findUnique({
      where: {
        scenarioId_normalizedQuestion: {
          scenarioId,
          normalizedQuestion: normalized,
        },
      },
    })

    if (!exact) return null

    void prisma.patientLearnedResponse
      .update({
        where: { id: exact.id },
        data: { usageCount: { increment: 1 } },
      })
      .catch(() => {})

    return { response: exact.response, id: exact.id, similarity: 1 }
  } catch (err) {
    console.error('Learned patient response lookup failed (run prisma migrate):', err)
    return null
  }
}

/** @deprecated Fuzzy cache disabled — use findExactLearnedPatientResponse */
export async function findLearnedPatientResponse(
  scenarioId: string,
  doctorQuestion: string
): Promise<LearnedMatch | null> {
  return findExactLearnedPatientResponse(scenarioId, doctorQuestion)
}

/** Persist a new AI-generated Q&A pair for future reuse in this scenario. */
export async function saveLearnedPatientResponse(
  scenarioId: string,
  doctorQuestion: string,
  response: string
): Promise<void> {
  const normalized = normalizeQuestion(doctorQuestion)
  const trimmedResponse = response.trim()
  if (!normalized || trimmedResponse.length < 8) return

  const keywords = uniqueQuestionWords(doctorQuestion).slice(0, 24)

  try {
    await upsertLearnedInner(scenarioId, doctorQuestion, normalized, trimmedResponse, keywords)
  } catch (err) {
    console.error('Failed to save learned patient response:', err)
  }
}

async function upsertLearnedInner(
  scenarioId: string,
  doctorQuestion: string,
  normalized: string,
  trimmedResponse: string,
  keywords: string[]
): Promise<void> {
  await prisma.patientLearnedResponse.upsert({
    where: {
      scenarioId_normalizedQuestion: {
        scenarioId,
        normalizedQuestion: normalized,
      },
    },
    create: {
      scenarioId,
      question: doctorQuestion.trim().slice(0, 500),
      normalizedQuestion: normalized,
      keywords,
      response: trimmedResponse.slice(0, 4000),
      source: 'ai_generated',
    },
    update: {
      response: trimmedResponse.slice(0, 4000),
      keywords,
      usageCount: { increment: 1 },
    },
  })
}
