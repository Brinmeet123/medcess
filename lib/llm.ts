/**
 * LLM: OpenAI chat completions.
 *
 * Env:
 * - OPENAI_BASE_URL — default https://api.openai.com/v1
 * - AI_MODEL or OPENAI_MODEL — default gpt-4o-mini
 * - OPENAI_API_KEY — required for real OpenAI calls (alias: OPENAI_API)
 * - DEMO_MODE=true — use mock responses in API routes (no OpenAI calls)
 * - USE_LOCAL_LLM_DEBRIEF_POLISH=true — optional prose-polish pass via LLM
 */

import { readAIModel, DEFAULT_AI_MODEL } from '@/lib/ai/config'

export type LLMMessage = { role: string; content: string }

export type TokenUsageBreakdown = {
  inputTokens: number
  outputTokens: number
  totalTokens: number
}

export type CallLLMResult = {
  content: string
  usage: TokenUsageBreakdown
  fromCache?: boolean
}

/** Bracket access avoids build-time env inlining so Vercel runtime secrets resolve. */
function readOpenAiApiKey(): string | undefined {
  const raw = process.env['OPENAI_API_KEY'] ?? process.env['OPENAI_API'] ?? ''
  const trimmed = String(raw).trim()
  return trimmed || undefined
}

function readOpenAiBaseUrl(): string {
  return (process.env['OPENAI_BASE_URL'] || 'https://api.openai.com/v1').replace(/\/$/, '')
}

export function readAIModelForExport(): string {
  return readAIModel()
}

function parseUsage(data: Record<string, unknown>): TokenUsageBreakdown {
  const usage = (data.usage ?? {}) as Record<string, number>
  const inputTokens = Number(usage.prompt_tokens ?? usage.input_tokens ?? 0) || 0
  const outputTokens = Number(usage.completion_tokens ?? usage.output_tokens ?? 0) || 0
  const totalTokens = Number(usage.total_tokens ?? inputTokens + outputTokens) || inputTokens + outputTokens
  return { inputTokens, outputTokens, totalTokens }
}

function toChatRole(role: string): 'system' | 'user' | 'assistant' {
  if (role === 'system' || role === 'user' || role === 'assistant') return role
  return role === 'doctor' ? 'user' : 'assistant'
}

export function getOllamaConfig(): {
  baseUrl: string
  model: string
  apiKeyConfigured: boolean
} {
  return {
    baseUrl: readOpenAiBaseUrl(),
    model: readAIModel(),
    apiKeyConfigured: Boolean(readOpenAiApiKey()),
  }
}

/** True when routes should call OpenAI (DEMO_MODE forces mocks instead). */
export function shouldUseOllamaLLM(): boolean {
  return process.env['DEMO_MODE'] !== 'true' && Boolean(readOpenAiApiKey())
}

/** @deprecated Use shouldUseOllamaLLM */
export function hasConfiguredLLM(): boolean {
  return shouldUseOllamaLLM()
}

/** @deprecated Ollama-only app; same as shouldUseOllamaLLM */
export function hasConfiguredCloudLLM(): boolean {
  return shouldUseOllamaLLM()
}

/** @deprecated Ollama-only app */
export function isCloudLLMConfigured(): boolean {
  return shouldUseOllamaLLM()
}

/**
 * Patient chat should only call OpenAI when enabled and configured.
 * Set PATIENT_CHAT_PRESET_ONLY=true to always use presets.
 */
export function shouldAttemptOllamaForPatientChat(): boolean {
  if (!shouldUseOllamaLLM()) return false
  if (process.env.PATIENT_CHAT_PRESET_ONLY === 'true') return false
  return true
}

export type CallLLMOptions = {
  /** Ask OpenAI for JSON-only output (helps structured routes like vocab definitions). */
  responseFormatJson?: boolean
  /** Optional cap on completion length (patient chat relies on prompt rules instead). */
  maxTokens?: number
  /** Sampling temperature (patient chat uses ~0.7). */
  temperature?: number
}

/** Low-level OpenAI call (no quota). Prefer callManagedLLM in API routes. */
export async function callLLMRaw(
  messages: LLMMessage[],
  options?: CallLLMOptions
): Promise<CallLLMResult> {
  const OPENAI_API_KEY = readOpenAiApiKey()
  if (!OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY')
  }

  const OPENAI_BASE_URL = readOpenAiBaseUrl()
  const OPENAI_MODEL = readAIModel()

  const url = `${OPENAI_BASE_URL}/chat/completions`
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  headers.Authorization = `Bearer ${OPENAI_API_KEY}`
  const body: Record<string, unknown> = {
    model: OPENAI_MODEL,
    messages: messages.map((m) => ({ role: toChatRole(m.role), content: m.content })),
    stream: false,
  }
  if (options?.responseFormatJson) {
    body.response_format = { type: 'json_object' }
  }
  if (options?.maxTokens != null) {
    body.max_tokens = options.maxTokens
  }
  if (options?.temperature != null) {
    body.temperature = options.temperature
  }
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(
      `OpenAI error (${res.status}) at ${OPENAI_BASE_URL}: ${text.slice(0, 500)}`
    )
  }

  const data = (await res.json()) as Record<string, unknown>
  const content = (data.choices as { message?: { content?: string } }[] | undefined)?.[0]?.message
    ?.content
  if (content == null) throw new Error('OpenAI returned no content')
  return {
    content,
    usage: parseUsage(data),
  }
}

/** @deprecated Use callManagedLLM from API routes for quota-aware calls. */
export async function callLLM(
  messages: LLMMessage[],
  options?: CallLLMOptions
): Promise<string> {
  const result = await callLLMRaw(messages, options)
  return result.content
}

export { DEFAULT_AI_MODEL }
