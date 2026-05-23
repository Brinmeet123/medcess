'use client'

import { useAIUsage } from '@/components/AIUsageHeaderIndicator'

function formatTokens(n: number): string {
  return n.toLocaleString()
}

export default function AIUsageCard({ className = '' }: { className?: string }) {
  const { usage, loading } = useAIUsage()

  if (loading) {
    return (
      <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
        <p className="text-sm text-slate-500">Loading AI usage…</p>
      </div>
    )
  }

  if (!usage) {
    return (
      <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
        <p className="text-sm text-slate-500">Usage unavailable</p>
      </div>
    )
  }

  const atLimit = usage.tokensUsed >= usage.dailyLimit
  const warn = !atLimit && usage.percentUsed >= 80
  const pct = Math.min(100, usage.percentUsed)

  const barColor = atLimit ? 'bg-red-500' : warn ? 'bg-amber-500' : 'bg-teal-600'
  const titleColor = atLimit ? 'text-red-700' : warn ? 'text-amber-800' : 'text-teal-800'

  return (
    <div
      className={`rounded-xl border shadow-sm p-4 ${
        atLimit
          ? 'border-red-200 bg-red-50/50'
          : warn
            ? 'border-amber-200 bg-amber-50/40'
            : 'border-slate-200 bg-white'
      } ${className}`}
    >
      <h3 className={`text-sm font-semibold uppercase tracking-wide mb-2 ${titleColor}`}>
        AI Usage Today
      </h3>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mb-2" aria-hidden>
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm font-medium text-slate-900 tabular-nums">
        {formatTokens(usage.tokensUsed)} / {formatTokens(usage.dailyLimit)} tokens
      </p>
      <p className="text-xs text-slate-600 mt-1">
        {pct}% used · {usage.requestCount} request{usage.requestCount === 1 ? '' : 's'} today
        {!usage.isRegistered ? ' · Guest limit' : ''}
      </p>
      {atLimit ? (
        <p className="text-xs text-red-700 mt-2 font-medium">
          Daily AI limit reached. Your usage resets tomorrow.
        </p>
      ) : warn ? (
        <p className="text-xs text-amber-800 mt-2">You are approaching today&apos;s AI limit.</p>
      ) : null}
    </div>
  )
}
