'use client'

import { useAIUsage } from '@/components/AIUsageHeaderIndicator'

type Props = {
  className?: string
}

/** Compact “AI used” bar for the top of the patient chat panel. */
export default function AIUsedBar({ className = '' }: Props) {
  const { usage, loading } = useAIUsage()

  if (loading || !usage) return null

  const used = usage.patientChatAiUsed
  const limit = usage.patientChatAiLimit
  const atLimit = used >= limit
  const warn = !atLimit && usage.patientChatAiPercentUsed >= 80
  const pct = Math.min(100, usage.patientChatAiPercentUsed)

  const barColor = atLimit
    ? 'bg-red-500 dark:bg-red-400'
    : warn
      ? 'bg-amber-500 dark:bg-amber-400'
      : 'bg-primary-600 dark:bg-primary-400'
  const labelColor = atLimit
    ? 'text-red-700 dark:text-red-300'
    : warn
      ? 'text-amber-800 dark:text-amber-300'
      : 'text-slate-700 dark:text-[#F8FAFC]'

  const containerClass = atLimit
    ? 'border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/40'
    : warn
      ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/80 dark:bg-amber-950/35'
      : 'border-slate-200 dark:border-[#14345C] bg-slate-50 dark:bg-[#0a1f3d]'

  const tooltip = atLimit
    ? 'Daily live AI limit reached. Scripted and cached answers still work — resets tomorrow.'
    : warn
      ? 'Approaching today’s live AI message limit.'
      : 'Only live AI patient replies count toward this limit. Presets and cached answers are free.'

  return (
    <div
      className={`rounded-lg border px-3 py-2 ${containerClass} ${className}`}
      title={tooltip}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}>
          AI used today
        </span>
        <span className={`text-xs font-medium tabular-nums ${labelColor}`}>
          {used}/{limit} live AI
        </span>
      </div>
      <div
        className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-[#14345C] overflow-hidden"
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-label={`Live AI messages used: ${used} of ${limit}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${Math.max(pct, pct > 0 ? 4 : 0)}%` }}
        />
      </div>
      {!usage.isRegistered ? (
        <p className="text-[10px] text-slate-500 dark:text-[#94a3b8] mt-1.5">Guest limit · sign in for more</p>
      ) : null}
    </div>
  )
}
