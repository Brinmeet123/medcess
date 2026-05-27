'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  GUEST_DAILY_TOKEN_LIMIT,
  REGISTERED_DAILY_TOKEN_LIMIT,
} from '@/lib/ai/config'
import { withClientTimezone } from '@/src/lib/aiRequestHeaders'
import { localUsageDayKeyForClient, msUntilNextLocalReset } from '@/src/lib/localUsageDay'

export type AIUsageData = {
  /** Local calendar day for this usage row (`YYYY-MM-DD`). */
  date?: string
  lastResetDate?: string
  resetsAt?: string
  tokensUsed: number
  dailyLimit: number
  percentUsed: number
  requestCount: number
  isRegistered: boolean
  patientChatAiUsed: number
  patientChatAiLimit: number
  patientChatAiPercentUsed: number
}

export function useAIUsage() {
  const [usage, setUsage] = useState<AIUsageData | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/ai-usage', {
        credentials: 'same-origin',
        headers: withClientTimezone(),
      })
      if (!res.ok) return
      const data = (await res.json()) as AIUsageData
      setUsage(data)
    } catch {
      /* silent — header indicator is optional */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
    const onFocus = () => void load()
    const onUsageUpdated = () => void load()
    window.addEventListener('focus', onFocus)
    window.addEventListener('ai-usage-updated', onUsageUpdated)

    const resetTimer = window.setTimeout(() => void load(), msUntilNextLocalReset())

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('ai-usage-updated', onUsageUpdated)
      window.clearTimeout(resetTimer)
    }
  }, [load])

  useEffect(() => {
    if (!usage?.date) return
    const today = localUsageDayKeyForClient()
    if (usage.date === today) return
    void load()
  }, [usage?.date, load])

  return { usage, loading, reload: load }
}

function formatTokens(n: number): string {
  if (n >= 10_000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

/** Subtle header chip — thin bar + tiny label; full stats on hover. */
export default function AIUsageHeaderIndicator({ className = '' }: { className?: string }) {
  const { usage, loading } = useAIUsage()
  const { status } = useSession()

  const sessionLimit =
    status === 'authenticated'
      ? REGISTERED_DAILY_TOKEN_LIMIT
      : status === 'unauthenticated'
        ? GUEST_DAILY_TOKEN_LIMIT
        : null

  const tokensUsed = usage?.tokensUsed ?? 0
  const dailyLimit = usage?.dailyLimit ?? sessionLimit
  const isRegistered = usage?.isRegistered ?? status === 'authenticated'
  const showCounts = dailyLimit != null && !loading

  const percentUsed =
    dailyLimit && dailyLimit > 0
      ? Math.min(100, Math.round((tokensUsed / dailyLimit) * 100))
      : 0

  const atLimit = showCounts && tokensUsed >= dailyLimit
  const warn = showCounts && !atLimit && percentUsed >= 80
  const pct = showCounts ? percentUsed : 0

  const barColor = atLimit
    ? 'bg-red-500 dark:bg-red-400'
    : warn
      ? 'bg-amber-500 dark:bg-amber-400'
      : 'bg-slate-400 dark:bg-primary-400'
  const labelColor = atLimit
    ? 'text-red-600 dark:text-red-300'
    : warn
      ? 'text-amber-700 dark:text-amber-300'
      : 'text-slate-500 dark:text-[#CBD5E1]'

  const countLabel = showCounts
    ? `${formatTokens(tokensUsed)}/${formatTokens(dailyLimit)}`
    : loading
      ? '…'
      : '—'

  const tooltip =
    loading && !dailyLimit
      ? 'Loading AI usage…'
      : dailyLimit == null
        ? 'Loading AI usage…'
        : [
            `AI today: ${tokensUsed.toLocaleString()} / ${dailyLimit.toLocaleString()} tokens`,
            usage
              ? `${usage.requestCount} request${usage.requestCount === 1 ? '' : 's'}`
              : null,
            isRegistered ? 'Registered — 60k tokens per day' : 'Guest — 20k tokens per day',
            atLimit
              ? 'Daily AI limit resets at midnight.'
              : warn
                ? 'Approaching daily limit.'
                : 'Daily AI limit resets at midnight.',
          ]
            .filter(Boolean)
            .join(' · ')

  return (
    <div
      className={`flex items-center gap-2 shrink-0 ${loading && !showCounts ? 'opacity-60' : ''} ${className}`}
      title={tooltip}
      aria-label={tooltip}
      aria-busy={loading && !showCounts}
    >
      <span className={`text-[10px] font-medium leading-none whitespace-nowrap ${labelColor}`}>
        AI usage
      </span>
      <div className="flex flex-col justify-center gap-0.5 min-w-[4.25rem] max-w-[5.5rem]">
        <div className="h-0.5 w-full rounded-full bg-slate-100 dark:bg-[#14345C] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${loading && !showCounts ? 'bg-slate-300 dark:bg-slate-600' : barColor}`}
            style={{
              width:
                loading && !showCounts ? '30%' : `${Math.max(pct, pct > 0 ? 4 : 0)}%`,
            }}
          />
        </div>
        <span className={`text-[10px] leading-none tabular-nums text-right ${labelColor}`}>
          {countLabel}
        </span>
      </div>
    </div>
  )
}
