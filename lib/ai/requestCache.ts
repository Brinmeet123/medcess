import { createHash } from 'crypto'
import type { LLMMessage } from '@/lib/llm'

type CacheEntry = {
  content: string
  usage: { inputTokens: number; outputTokens: number; totalTokens: number }
  expiresAt: number
}

const CACHE_TTL_MS = 60_000
const MAX_ENTRIES = 128

const cache = new Map<string, CacheEntry>()

function prune(): void {
  const now = Date.now()
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(key)
  }
  while (cache.size > MAX_ENTRIES) {
    const first = cache.keys().next().value
    if (first) cache.delete(first)
  }
}

export function buildLLMCacheKey(model: string, messages: LLMMessage[], jsonMode: boolean): string {
  const payload = JSON.stringify({ model, jsonMode, messages })
  return createHash('sha256').update(payload).digest('hex')
}

export function getCachedLLMResponse(key: string): CacheEntry | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key)
    return null
  }
  return entry
}

export function setCachedLLMResponse(
  key: string,
  content: string,
  usage: { inputTokens: number; outputTokens: number; totalTokens: number }
): void {
  prune()
  cache.set(key, {
    content,
    usage,
    expiresAt: Date.now() + CACHE_TTL_MS,
  })
}
