import type { AIActor } from '@/lib/ai/resolveActor'
import {
  assertWithinDailyLimit,
  recordTokenUsage,
  type TokenUsageBreakdown,
} from '@/lib/ai/tokenUsage'
import {
  buildLLMCacheKey,
  getCachedLLMResponse,
  setCachedLLMResponse,
} from '@/lib/ai/requestCache'
import { isDailyAILimitError } from '@/lib/ai/errors'
import {
  callLLMRaw,
  type CallLLMOptions,
  type CallLLMResult,
  type LLMMessage,
  readAIModelForExport,
  shouldUseOllamaLLM,
} from '@/lib/llm'

export type { LLMMessage, CallLLMOptions, CallLLMResult, TokenUsageBreakdown }

export { isDailyAILimitError, readAIModelForExport as readAIModel }

/**
 * Enforces daily quotas, optional short-lived response cache, and records usage
 * only after successful completions.
 */
export async function callManagedLLM(
  messages: LLMMessage[],
  actor: AIActor,
  options?: CallLLMOptions & { skipQuota?: boolean; skipCache?: boolean }
): Promise<CallLLMResult> {
  if (!shouldUseOllamaLLM()) {
    throw new Error('Missing OPENAI_API_KEY')
  }

  const model = readAIModelForExport()
  const cacheKey =
    options?.skipCache === true
      ? null
      : buildLLMCacheKey(model, messages, Boolean(options?.responseFormatJson))

  if (cacheKey) {
    const cached = getCachedLLMResponse(cacheKey)
    if (cached) {
      return { content: cached.content, usage: cached.usage, fromCache: true }
    }
  }

  if (!options?.skipQuota) {
    await assertWithinDailyLimit(actor.actorId, actor.isRegistered)
  }

  const result = await callLLMRaw(messages, options)

  if (!options?.skipQuota) {
    await recordTokenUsage(actor.actorId, result.usage)
  }

  if (cacheKey) {
    setCachedLLMResponse(cacheKey, result.content, result.usage)
  }

  return result
}
