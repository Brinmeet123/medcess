'use client'

import type { ScenarioDifficulty } from '@/data/scenarios'

type Props = {
  title: string
  subtitle?: string
  difficulty: ScenarioDifficulty
}

function Badge({ children, tone = 'brand' }: { children: React.ReactNode; tone?: 'brand' | 'level' }) {
  const tones = {
    brand:
      'bg-primary-100 text-primary-900 border-primary-200/80 dark:bg-primary-900/40 dark:text-primary-200 dark:border-primary-700/50',
    level:
      'bg-amber-100 text-amber-900 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-700/50',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export default function MedacademyCaseHeader({ title, subtitle, difficulty }: Props) {
  return (
    <header className="mb-6 rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm dark:border-[#14345C] dark:from-[#071A33] dark:to-[#0a1f3d]">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-[#94a3b8]">
        Active case
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="brand">MEDacademy Case</Badge>
        <Badge tone="level">{difficulty}</Badge>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] sm:text-3xl">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-sm font-medium text-primary-700 dark:text-primary-300">{subtitle}</p>
      ) : null}
    </header>
  )
}
