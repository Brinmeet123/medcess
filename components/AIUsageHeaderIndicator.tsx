'use client'

import { useCallback, useEffect, useState } from 'react'
import { GUEST_DAILY_TOKEN_LIMIT } from '@/lib/ai/config'

export type AIUsageData = {
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
      const res = await fetch('/api/ai-usage', { credentials: 'same-origin' })
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
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('ai-usage-updated', onUsageUpdated)
    }
  }, [load])

  return { usage, loading, reload: load }
}

function formatTokens(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  return String(n)
}

/** Subtle header chip — thin bar + tiny label; full stats on hover. */
export default function AIUsageHeaderIndicator({ className = '' }: { className?: string }) {
  const { usage, loading } = useAIUsage()

  const display = usage ?? {
    tokensUsed: 0,
    dailyLimit: GUEST_DAILY_TOKEN_LIMIT,
    percentUsed: 0,
    requestCount: 0,
    isRegistered: false,
    patientChatAiUsed: 0,
    patientChatAiLimit: 15,
    patientChatAiPercentUsed: 0,
  }

  const atLimit = !loading && display.tokensUsed >= display.dailyLimit
  const warn = !loading && !atLimit && display.percentUsed >= 80
  const pct = Math.min(100, display.percentUsed)

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

  const tooltip = loading
    ? 'Loading AI usage…'
    : [
        `AI today: ${display.tokensUsed.toLocaleString()} / ${display.dailyLimit.toLocaleString()} tokens`,
        `${display.requestCount} request${display.requestCount === 1 ? '' : 's'}`,
        atLimit ? 'Limit reached — resets tomorrow.' : warn ? 'Approaching daily limit.' : null,
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
          {formatTokens(display.tokensUsed)}/{formatTokens(display.dailyLimit)}
        </span>
      </div>
    </div>
  )
}
