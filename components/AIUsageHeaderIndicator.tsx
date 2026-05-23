'use client'

import { useCallback, useEffect, useState } from 'react'

export type AIUsageData = {
  tokensUsed: number
  dailyLimit: number
  percentUsed: number
  requestCount: number
  isRegistered: boolean
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

  if (loading || !usage) return null

  const atLimit = usage.tokensUsed >= usage.dailyLimit
  const warn = !atLimit && usage.percentUsed >= 80
  const pct = Math.min(100, usage.percentUsed)

  const barColor = atLimit ? 'bg-red-400' : warn ? 'bg-amber-400' : 'bg-slate-300'
  const labelColor = atLimit ? 'text-red-600' : warn ? 'text-amber-700' : 'text-slate-400'

  const tooltip = [
    `AI today: ${usage.tokensUsed.toLocaleString()} / ${usage.dailyLimit.toLocaleString()} tokens`,
    `${usage.requestCount} request${usage.requestCount === 1 ? '' : 's'}`,
    atLimit ? 'Limit reached — resets tomorrow.' : warn ? 'Approaching daily limit.' : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div
      className={`flex items-center gap-2 shrink-0 ${className}`}
      title={tooltip}
      aria-label={tooltip}
    >
      <span className={`text-[10px] font-medium leading-none whitespace-nowrap ${labelColor}`}>
        AI usage
      </span>
      <div className="flex flex-col justify-center gap-0.5 min-w-[3.5rem] max-w-[4.5rem]">
        <div className="h-0.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${Math.max(pct, pct > 0 ? 4 : 0)}%` }}
          />
        </div>
        <span className={`text-[10px] leading-none tabular-nums text-right ${labelColor}`}>
          {formatTokens(usage.tokensUsed)}/{formatTokens(usage.dailyLimit)}
        </span>
      </div>
    </div>
  )
}
