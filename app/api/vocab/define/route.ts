import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { callManagedLLM } from '@/lib/ai/callManagedLLM'
import { dailyLimitJsonResponse, isDailyLimitResponse } from '@/lib/ai/apiHelpers'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'
import {
  findSharedVocabByTerm,
  incrementSharedVocabUsage,
  saveSharedVocabEntry,
} from '@/lib/sharedVocab'
import { normalizeVocabTermForLookup } from '@/lib/vocabNormalize'

export const dynamic = 'force-dynamic'

const DEMO = process.env.DEMO_MODE === 'true'

const bodySchema = z.object({
  term: z.string().min(1).max(120),
  contextSentence: z.string().max(2000).optional(),
  caseId: z.string().max(120).optional(),
  userId: z.string().max(120).optional(),
  sessionId: z.string().max(120).optional(),
})

export type VocabDefineResponse = {
  term: string
  shortDefinition: string
  definition: string
  category: string
  source: 'cache' | 'ai_generated' | 'demo'
  cached: boolean
  usageCount: number
  isAIGenerated: boolean
}

function toResponse(row: {
  term: string
  simpleDefinition: string
  definition: string
  category: string | null
  usageCount: number
  cached: boolean
  source: VocabDefineResponse['source']
}): VocabDefineResponse {
  return {
    term: row.term,
    shortDefinition: row.simpleDefinition,
    definition: row.definition,
    category: row.category ?? 'general',
    source: row.source,
    cached: row.cached,
    usageCount: row.usageCount,
    isAIGenerated: row.source === 'ai_generated' || row.source === 'demo',
  }
}

function demoDefinition(term: string, contextSentence?: string): VocabDefineResponse {
  const contextNote = contextSentence
    ? ` In this case, it appears in the sentence: "${contextSentence.slice(0, 120)}${contextSentence.length > 120 ? '…' : ''}".`
    : ''
  return {
    term,
    shortDefinition: `Educational overview of “${term}” (demo mode).`,
    definition: `“${term}” is a medical term used in learning scenarios.${contextNote} DEMO_MODE is enabled, so AI definitions are replaced with this placeholder.`,
    category: 'general',
    source: 'demo',
    cached: false,
    usageCount: 0,
    isAIGenerated: true,
  }
}

async function generateAIDefinition(
  term: string,
  contextSentence: string | undefined,
  actor: Awaited<ReturnType<typeof resolveAIActorFromRequest>>
): Promise<{
  term: string
  shortDefinition: string
  definition: string
  category: string
}> {
  const systemPrompt = `You are a medical education assistant for high school and pre-med students.
Return ONLY valid JSON (no markdown fences, no commentary) with exactly this shape:
{
  "term": string,
  "shortDefinition": string,
  "definition": string,
  "category": string
}
Rules:
- Keep definitions short and student-friendly
- Use accurate medical language but avoid overly advanced jargon
- Do not use emojis
- Do not give medical advice, treatment instructions, or dosing
- "shortDefinition" is one clear sentence
- "definition" is 2-3 sentences maximum
- "category" is a specialty or topic (e.g. cardiology, pharmacology, lab test, symptom, general)`

  const contextBlock = contextSentence
    ? `\n\nThe term appears in this patient case context:\n"${contextSentence.trim()}"\n\nWhen helpful, briefly explain why this term matters in that context within the definition.`
    : ''

  const userPrompt = `Define the medical term "${term.trim()}" for a student learning from simulated patient cases.${contextBlock}`

  const { content: text } = await callManagedLLM(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    actor,
    { responseFormatJson: true, maxTokens: 400, temperature: 0.3 }
  )

  let jsonText = text
  const m = text.match(/\{[\s\S]*\}/)
  if (m) jsonText = m[0]

  const parsed = JSON.parse(jsonText) as Record<string, unknown>
  const shortDefinition = String(parsed.shortDefinition ?? parsed.simpleDefinition ?? '').trim()
  const definition = String(parsed.definition ?? shortDefinition).trim()

  if (!shortDefinition) {
    throw new Error('AI returned empty definition')
  }

  return {
    term: String(parsed.term ?? term).trim() || term.trim(),
    shortDefinition,
    definition: definition || shortDefinition,
    category: String(parsed.category ?? 'general').trim() || 'general',
  }
}

export async function POST(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)

  try {
    const parsed = bodySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { term, contextSentence } = parsed.data
    const trimmedTerm = term.trim()
    const normalizedTerm = normalizeVocabTermForLookup(trimmedTerm)

    if (!normalizedTerm) {
      return NextResponse.json({ error: 'Term is empty after normalization' }, { status: 400 })
    }

    const cached = await findSharedVocabByTerm(trimmedTerm)
    if (cached) {
      const updated = await incrementSharedVocabUsage(cached.id)
      const res = NextResponse.json(
        toResponse({
          term: updated.term,
          simpleDefinition: updated.simpleDefinition,
          definition: updated.definition,
          category: updated.category,
          usageCount: updated.usageCount,
          cached: true,
          source: 'cache',
        })
      )
      applyActorCookie(res, actor)
      return res
    }

    if (DEMO) {
      const res = NextResponse.json(demoDefinition(trimmedTerm, contextSentence))
      applyActorCookie(res, actor)
      return res
    }

    const ai = await generateAIDefinition(trimmedTerm, contextSentence, actor)

    const raced = await findSharedVocabByTerm(trimmedTerm)
    if (raced) {
      const updated = await incrementSharedVocabUsage(raced.id)
      const res = NextResponse.json(
        toResponse({
          term: updated.term,
          simpleDefinition: updated.simpleDefinition,
          definition: updated.definition,
          category: updated.category,
          usageCount: updated.usageCount,
          cached: true,
          source: 'cache',
        })
      )
      applyActorCookie(res, actor)
      return res
    }

    const saved = await saveSharedVocabEntry({
      term: ai.term,
      normalizedTerm,
      definition: ai.definition,
      simpleDefinition: ai.shortDefinition,
      category: ai.category,
      source: 'ai_generated',
    })

    const res = NextResponse.json(
      toResponse({
        term: saved.term,
        simpleDefinition: saved.simpleDefinition,
        definition: saved.definition,
        category: saved.category,
        usageCount: saved.usageCount,
        cached: false,
        source: 'ai_generated',
      })
    )
    applyActorCookie(res, actor)
    return res
  } catch (e: unknown) {
    if (isDailyLimitResponse(e)) {
      const res = dailyLimitJsonResponse()
      applyActorCookie(res, actor)
      return res
    }

    const msg = e instanceof Error ? e.message : 'Unknown error'
    console.error('vocab/define:', msg)
    const res = NextResponse.json({ error: 'Failed to define term', details: msg }, { status: 500 })
    applyActorCookie(res, actor)
    return res
  }
}
