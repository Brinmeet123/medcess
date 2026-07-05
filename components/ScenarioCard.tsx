import Link from 'next/link'
import { Scenario, ScenarioDifficulty } from '@/data/scenarios'
import type { ScenarioProgressInfo } from './ScenarioList'
import { difficultyUiLabel } from '@/lib/scenarioUi'
import { isGuestAccessible } from '@/lib/caseAccess'

type Props = {
  scenario: Scenario
  progress?: ScenarioProgressInfo
  /** When session is still loading, avoid showing signed-out-only lock chrome. */
  sessionReady: boolean
  sessionStatus: 'loading' | 'authenticated' | 'unauthenticated'
  isAuthenticated: boolean
}

const difficultyColors: Record<ScenarioDifficulty, string> = {
  Beginner:
    'bg-emerald-100 text-emerald-900 border border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-600/50',
  Intermediate:
    'bg-amber-100 text-amber-900 border border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-600/50',
  Advanced:
    'bg-rose-100 text-rose-900 border border-rose-200/80 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-600/50',
}

function statusBadge(progress?: ScenarioProgressInfo) {
  const pill =
    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border tabular-nums'

  if (!progress) {
    return (
      <span
        className={`${pill} bg-slate-100 text-slate-700 border-slate-200 dark:bg-[#0a1f3d] dark:text-[#CBD5E1] dark:border-[#14345C]`}
      >
        Not started
      </span>
    )
  }
  if (progress.status === 'in_progress') {
    return (
      <span
        className={`${pill} bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-600/50`}
      >
        In progress
      </span>
    )
  }
  if (progress.status === 'completed') {
    return (
      <span
        className={`${pill} bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-600/50`}
      >
        Done
        {progress.bestScore != null ? <span>· {progress.bestScore}</span> : null}
      </span>
    )
  }
  return null
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 1a4 4 0 00-4 4v3H5a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2h-1V5a4 4 0 00-4-4zm2 7V5a2 2 0 10-4 0v3h4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const guestAccessPillClass =
  'inline-flex items-center gap-1.5 rounded-md border px-1.5 py-[3px] text-[11px] font-semibold leading-none'

export default function ScenarioCard({
  scenario,
  progress,
  sessionReady,
  sessionStatus,
  isAuthenticated,
}: Props) {
  const guestOk = isGuestAccessible(scenario.id)
  const needsSignIn = sessionReady && !guestOk && !isAuthenticated
  const href = needsSignIn
    ? `/login?callbackUrl=${encodeURIComponent(`/scenarios/${scenario.id}`)}`
    : `/scenarios/${scenario.id}`

  const showGuestAccessBadges = sessionStatus === 'unauthenticated'

  const accessBadge = !showGuestAccessBadges
    ? null
    : guestOk ? (
        <span
          className={`${guestAccessPillClass} border-emerald-300/90 bg-emerald-50 text-emerald-900 dark:border-emerald-600/60 dark:bg-emerald-950/60 dark:text-emerald-200`}
          title="Free — no account needed"
        >
          <span aria-hidden>🟢</span> Guest
        </span>
      ) : needsSignIn ? (
        <span
          className={`${guestAccessPillClass} border-rose-300/90 bg-rose-50 text-rose-900 dark:border-rose-600/60 dark:bg-rose-950/50 dark:text-rose-200`}
          title="Create an account or sign in to play this case"
        >
          <span aria-hidden>🔴</span> Sign In Required
        </span>
      ) : null

  return (
    <Link
      href={href}
      title={needsSignIn ? 'Sign in to unlock this case' : scenario.title}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#020817] rounded-lg"
    >
      <div
        className={`relative bg-white dark:bg-[#071A33] rounded-lg shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer border overflow-hidden ${
          needsSignIn
            ? 'border-slate-200 dark:border-[#14345C]'
            : 'border-gray-200 dark:border-[#14345C]'
        }`}
      >
        <div
          className={`relative h-11 sm:h-12 w-full shrink-0 bg-gradient-to-br from-primary-100 via-slate-100 to-primary-50 dark:from-primary-900/50 dark:via-[#0a1f3d] dark:to-primary-800/40 transition-all ${
            needsSignIn ? 'opacity-[0.88] blur-[0.6px] group-hover:opacity-95 group-hover:blur-[0.3px]' : ''
          }`}
        >
          {needsSignIn ? (
            <div
              className="absolute inset-0 flex items-center justify-center text-slate-500/80 dark:text-[#CBD5E1]/70"
              aria-hidden
            >
              <LockIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          ) : null}
        </div>

        {accessBadge ? (
          <div className="absolute top-1.5 right-1.5 z-10 max-w-[calc(100%-0.75rem)]">{accessBadge}</div>
        ) : null}

        <div className={`p-6 pt-4 flex flex-col flex-grow min-h-0 ${needsSignIn ? 'opacity-90' : ''}`}>
          <div className="flex justify-between items-start mb-3 gap-2 pr-1">
            <div className="min-w-0 pr-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-[#F8FAFC]">{scenario.title}</h3>
              {isAuthenticated && guestOk ? (
                <p className="mt-0.5 text-xs font-normal text-slate-400 dark:text-[#94a3b8]">Starter Case</p>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[scenario.difficulty]}`}
                title={scenario.difficulty}
              >
                {difficultyUiLabel(scenario.difficulty)}
              </span>
              {statusBadge(progress)}
            </div>
          </div>
          <div className="mb-3">
            {scenario.cardCategory ? (
              <>
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {scenario.cardCategory}
                </span>
                <span className="text-sm text-gray-500 dark:text-[#94a3b8] mx-2">•</span>
              </>
            ) : (
              <>
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{scenario.specialty}</span>
                <span className="text-sm text-gray-500 dark:text-[#94a3b8] mx-2">•</span>
              </>
            )}
            <span className="text-sm text-gray-500 dark:text-[#94a3b8]">{scenario.estimatedMinutes} min</span>
          </div>
          {scenario.sectionLayout === 'medacademy' ? (
            <p className="text-gray-600 dark:text-[#CBD5E1] text-sm flex-grow mb-2">{scenario.cardTeaser}</p>
          ) : (
            <p className="text-gray-600 dark:text-[#CBD5E1] text-sm flex-grow mb-2">{scenario.description}</p>
          )}
          {scenario.sectionLayout !== 'medacademy' ? (
            <p className="text-sm text-slate-500 dark:text-[#94a3b8] italic mb-3 leading-snug">{scenario.cardTeaser}</p>
          ) : null}
          {progress &&
            (progress.bestScore != null || progress.lastAttemptScore != null) &&
            (progress.status === 'completed' || progress.status === 'in_progress') && (
              <p className="text-xs text-slate-600 dark:text-[#CBD5E1] tabular-nums mb-4">
                {progress.bestScore != null && <span>Best {progress.bestScore}/200</span>}
                {progress.lastAttemptScore != null && (
                  <span>
                    {progress.bestScore != null ? ' · ' : ''}Last {progress.lastAttemptScore}/200
                  </span>
                )}
              </p>
            )}
          <div
            className={`btn-press mt-auto inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold ring-1 w-fit ${
              needsSignIn
                ? 'bg-slate-50 text-slate-800 ring-slate-200/80 dark:bg-[#0a1f3d] dark:text-[#F8FAFC] dark:ring-[#14345C] group-hover:bg-slate-100 dark:group-hover:bg-[#14345C]/40'
                : 'bg-primary-50 text-primary-800 ring-primary-200/80 dark:bg-primary-900/40 dark:text-primary-300 dark:ring-primary-600/40 dark:group-hover:bg-primary-900/60'
            }`}
          >
            {needsSignIn ? 'Sign in to unlock →' : 'Start Case →'}
          </div>
        </div>
      </div>
    </Link>
  )
}
