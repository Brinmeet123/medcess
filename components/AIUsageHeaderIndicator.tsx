'use client'

import { useCallback, useEffect, useState } from 'react'
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
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  return String(n)
}

/** Subtle header chip — thin bar + tiny label; full stats on hover. */
export default function AIUsageHeaderIndicator({ className = '' }: { className?: string }) {
  const { usage, loading } = useAIUsage()

  const atLimit = Boolean(usage && usage.tokensUsed >= usage.dailyLimit)
  const warn = Boolean(usage && !atLimit && usage.percentUsed >= 80)
  const pct = usage ? Math.min(100, usage.percentUsed) : 0

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

  const tooltip = loading || !usage
    ? 'Loading AI usage…'
    : [
        `AI today: ${usage.tokensUsed.toLocaleString()} / ${usage.dailyLimit.toLocaleString()} tokens`,
        `${usage.requestCount} request${usage.requestCount === 1 ? '' : 's'}`,
        usage.isRegistered ? 'Registered account (60k/day)' : 'Guest (20k/day)',
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
      className={`flex items-center gap-2 shrink-0 ${loading ? 'opacity-60' : ''} ${className}`}
      title={tooltip}
      aria-label={tooltip}
      aria-busy={loading}
    >
      <span className={`text-[10px] font-medium leading-none whitespace-nowrap ${labelColor}`}>
        AI usage
      </span>
      <div className="flex flex-col justify-center gap-0.5 min-w-[3.5rem] max-w-[4.5rem]">
        <div className="h-0.5 w-full rounded-full bg-slate-100 dark:bg-[#14345C] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${loading ? 'bg-slate-300 dark:bg-slate-600' : barColor}`}
            style={{ width: loading ? '30%' : `${Math.max(pct, pct > 0 ? 4 : 0)}%` }}
          />
        </div>
        <span className={`text-[10px] leading-none tabular-nums text-right ${labelColor}`}>
          {usage
            ? `${formatTokens(usage.tokensUsed)}/${formatTokens(usage.dailyLimit)}`
            : '—'}
        </span>
      </div>
    </div>
  )
}
