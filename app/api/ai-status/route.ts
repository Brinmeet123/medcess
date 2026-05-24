import { NextResponse } from 'next/server'
import { DEFAULT_AI_MODEL } from '@/lib/ai/config'
import { getOllamaConfig, shouldUseOllamaLLM } from '@/lib/llm'

/** Read OPENAI_* and DEMO_MODE at request time (Vercel / Next 14). */
export const dynamic = 'force-dynamic'

export async function GET() {
  const demoMode = process.env.DEMO_MODE === 'true'
  const { baseUrl, model, apiKeyConfigured } = getOllamaConfig()
  const useOllama = shouldUseOllamaLLM()

  const aiWillUse = demoMode
    ? 'Mock responses only (DEMO_MODE=true)'
    : `OpenAI (${model} @ ${baseUrl})`

  const hint = demoMode
    ? 'Unset DEMO_MODE or set to false to use OpenAI for real AI.'
    : apiKeyConfigured
      ? 'Optional: set AI_MODEL (or OPENAI_MODEL) and OPENAI_BASE_URL if you use a non-default endpoint.'
      : 'In Vercel → Project → Settings → Environment Variables, set OPENAI_API_KEY (or OPENAI_API) for Production (and Preview if you use preview URLs), then redeploy. Optional: AI_MODEL, OPENAI_BASE_URL.'

  return NextResponse.json({
    ok: true,
    provider: 'openai',
    model,
    defaultModel: DEFAULT_AI_MODEL,
    modelMatchesDefault: model === DEFAULT_AI_MODEL,
    openaiBaseUrl: baseUrl,
    openaiApiKeyConfigured: apiKeyConfigured,
    demoModeEnv: demoMode,
    openaiEnabled: useOllama,
    aiWillUse,
    patientChatMode: demoMode
      ? 'demo-mock'
      : useOllama
        ? `openai (${model})`
        : 'preset-only',
    hint,
    openAIConfigured: apiKeyConfigured,
    healthCheckUrl: '/api/ai-health',
  })
}
