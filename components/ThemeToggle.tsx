'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

type Props = {
  className?: string
  /** Compact icon-only for mobile nav */
  compact?: boolean
}

export default function ThemeToggle({ className = '', compact = false }: Props) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`btn-press p-2 rounded-xl border border-slate-200 dark:border-[#14345C] bg-white dark:bg-[#071A33] text-medcess-navy dark:text-[#F8FAFC] hover:bg-primary-50 dark:hover:bg-[#0a1f3d] transition-colors ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <Sun className="h-5 w-5 text-primary-400" /> : <Moon className="h-5 w-5 text-primary-600" />}
      </button>
    )
  }

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-slate-200 dark:border-[#14345C] bg-slate-100/80 dark:bg-[#071A33] p-0.5 ${className}`}
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`btn-press inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
          !isDark
            ? 'bg-white dark:bg-[#0a1f3d] text-primary-700 dark:text-[#F8FAFC] shadow-sm'
            : 'text-slate-600 dark:text-[#CBD5E1] hover:text-primary-600'
        }`}
        aria-pressed={!isDark}
      >
        <Sun className="h-3.5 w-3.5" aria-hidden />
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`btn-press inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
          isDark
            ? 'bg-[#0a1f3d] text-[#F8FAFC] shadow-sm ring-1 ring-[#14345C]'
            : 'text-slate-600 dark:text-[#CBD5E1] hover:text-primary-600'
        }`}
        aria-pressed={isDark}
      >
        <Moon className="h-3.5 w-3.5" aria-hidden />
        Dark
      </button>
    </div>
  )
}
