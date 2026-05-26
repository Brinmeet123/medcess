import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { callManagedLLM } from '@/lib/ai/callManagedLLM'
import { dailyLimitJsonResponse, isDailyLimitResponse } from '@/lib/ai/apiHelpers'
import { applyActorCookie, resolveAIActorFromRequest } from '@/lib/ai/resolveActor'

export const dynamic = 'force-dynamic'

const DEMO = process.env.DEMO_MODE === 'true'

const bodySchema = z.object({
  selectedText: z.string().min(1).max(400),
  contextSentence: z.string().max(2000).optional(),
  caseId: z.string().max(120).optional(),
  source: z.string().max(80).optional(),
})

function demoExplanation(selectedText: string, contextSentence?: string): string {
  const ctx = contextSentence
    ? ` It showed up in your feedback like this: “${contextSentence.slice(0, 140)}${contextSentence.length > 140 ? '…' : ''}”.`
    : ''
  return `In simpler terms, this part of your results (“${selectedText.slice(0, 100)}${selectedText.length > 100 ? '…' : ''}”) is feedback about how you did in the case.${ctx} DEMO_MODE is on, so this is a placeholder instead of a full AI rewrite.`
}

export async function POST(request: NextRequest) {
  const actor = await resolveAIActorFromRequest(request)

  try {
    const parsed = bodySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { selectedText, contextSentence, source } = parsed.data
    const trimmed = selectedText.trim()

    if (DEMO) {
      const res = NextResponse.json({
        explanation: demoExplanation(trimmed, contextSentence),
        source: 'demo' as const,
      })
      applyActorCookie(res, actor)
      return res
    }

    const contextBlock = contextSentence
      ? `\n\nSurrounding feedback context:\n"${contextSentence.trim()}"`
      : ''
    const sourceNote = source ? `\n\nThis text is from: ${source}` : ''

    const systemPrompt = `You are a medical education coach for high school and pre-med students.
The student highlighted a phrase from their case results, test feedback, score breakdown, or debrief.
Rewrite ONLY what the highlighted text means in plain, student-friendly language.

Rules:
- 2-4 short sentences maximum
- No jargon unless you immediately explain it
- Do not give personal medical advice
- Do not suggest treatments or diagnoses for the student
- Focus on explaining the feedback or result, not defining a vocabulary term
- Do not use emojis
Return ONLY the explanation text (no JSON, no markdown, no heading).`

    const userPrompt = `Highlighted text:\n"${trimmed}"${contextBlock}${sourceNote}

Explain this in simpler language so a student understands what their results are saying.`

    const { content: text } = await callManagedLLM(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      actor,
      { maxTokens: 280, temperature: 0.4 }
    )

    const explanation = text.trim()
    if (!explanation) {
      return NextResponse.json({ error: 'Empty explanation' }, { status: 500 })
    }

    const res = NextResponse.json({
      explanation,
      source: 'ai' as const,
    })
    applyActorCookie(res, actor)
    return res
  } catch (e: unknown) {
    if (isDailyLimitResponse(e)) {
      const res = dailyLimitJsonResponse()
      applyActorCookie(res, actor)
      return res
    }

    const msg = e instanceof Error ? e.message : 'Unknown error'
    console.error('explain-result:', msg)
    const res = NextResponse.json({ error: 'Failed to explain result', details: msg }, { status: 500 })
    applyActorCookie(res, actor)
    return res
  }
}
