import { NextResponse } from 'next/server'
import { callLLMRaw, getOllamaConfig, shouldUseOllamaLLM } from '@/lib/llm'
import { DEFAULT_AI_MODEL } from '@/lib/ai/config'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/** Quick production check: model, OpenAI reachability, database, auth secret. */
export async function GET() {
  const demoMode = process.env.DEMO_MODE === 'true'
  const { baseUrl, model, apiKeyConfigured } = getOllamaConfig()
  const authSecretConfigured = Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim()
  )

  const checks: Record<string, { ok: boolean; detail?: string }> = {
    demoMode: { ok: !demoMode, detail: demoMode ? 'DEMO_MODE=true — patient chat uses mocks, not OpenAI' : 'Live AI enabled' },
    openaiKey: {
      ok: apiKeyConfigured,
      detail: apiKeyConfigured ? 'OPENAI_API_KEY set' : 'Missing OPENAI_API_KEY',
    },
    model: {
      ok: model === DEFAULT_AI_MODEL || Boolean(process.env.AI_MODEL || process.env.OPENAI_MODEL),
      detail: `Using model: ${model} (default: ${DEFAULT_AI_MODEL})`,
    },
    authSecret: {
      ok: authSecretConfigured || process.env.NODE_ENV === 'development',
      detail: authSecretConfigured ? 'AUTH_SECRET set' : 'AUTH_SECRET missing in production',
    },
  }

  let openaiPing: { ok: boolean; detail?: string; sample?: string } = { ok: false, detail: 'Skipped' }
  if (!demoMode && apiKeyConfigured) {
    try {
      const { content } = await callLLMRaw(
        [{ role: 'user', content: 'Reply with exactly: Medcess AI OK' }],
        { maxTokens: 20, temperature: 0 }
      )
      openaiPing = {
        ok: content.toLowerCase().includes('medcess') || content.toLowerCase().includes('ok'),
        detail: 'OpenAI chat/completions reachable',
        sample: content.slice(0, 120),
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      openaiPing = { ok: false, detail: msg.slice(0, 300) }
    }
  }

  let database: { ok: boolean; detail?: string } = { ok: false, detail: 'Skipped' }
  try {
    await prisma.$queryRaw`SELECT 1`
    database = { ok: true, detail: 'DATABASE_URL connected' }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    database = { ok: false, detail: msg.slice(0, 200) }
  }

  const allOk =
    checks.openaiKey.ok &&
    checks.authSecret.ok &&
    database.ok &&
    (demoMode || openaiPing.ok)

  return NextResponse.json({
    ok: allOk,
    app: 'Medcess',
    provider: 'openai',
    model,
    defaultModel: DEFAULT_AI_MODEL,
    openaiBaseUrl: baseUrl,
    openaiEnabled: shouldUseOllamaLLM(),
    checks: { ...checks, openaiPing, database },
    features: {
      patientChat: demoMode ? 'demo-mock' : apiKeyConfigured ? `openai (${model})` : 'preset-only',
      assessment: demoMode ? 'demo-mock' : apiKeyConfigured ? `openai (${model})` : 'deterministic-debrief',
      vocabDefine: demoMode ? 'demo-mock' : apiKeyConfigured ? `openai (${model}) via /api/vocab/define` : 'disabled',
      explainResult: demoMode ? 'demo-mock' : apiKeyConfigured ? `openai (${model}) via /api/explain-result` : 'disabled',
      explainTerm: demoMode ? 'demo-mock' : apiKeyConfigured ? `openai (${model}) via /api/explain-term` : 'disabled',
    },
    hint: !apiKeyConfigured
      ? 'Set OPENAI_API_KEY on Vercel and redeploy.'
      : demoMode
        ? 'Unset DEMO_MODE for live GPT patient chat.'
        : model !== DEFAULT_AI_MODEL
          ? `Set AI_MODEL=${DEFAULT_AI_MODEL} on Vercel to match the intended default.`
          : 'Open /api/test-key for a second OpenAI smoke test.',
  })
}
