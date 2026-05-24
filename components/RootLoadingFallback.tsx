import { APP_NAME } from '@/lib/branding'
import MedcessLogo from './MedcessLogo'

/** Shown while the async session shell resolves (keeps root layout synchronous for stable dev HMR). */
export default function RootLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020817]">
      <div className="h-16 border-b border-slate-200 dark:border-[#14345C] bg-white/95 dark:bg-[#020817]/95 flex items-center px-4 sm:px-6 shadow-medcess-sm">
        <MedcessLogo size="sm" variant="full" href={null} />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-medcess-hero dark:bg-medcess-hero-dark">
        <div className="flex flex-col items-center gap-6 animate-pulse-soft">
          <MedcessLogo size="lg" variant="full" href={null} glow />
          <p className="text-sm text-slate-500">Loading {APP_NAME}…</p>
        </div>
        <div className="mt-12 w-full max-w-md space-y-3" aria-hidden>
          <div className="h-3 bg-primary-100 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-primary-100 rounded-full w-5/6 animate-pulse" />
          <div className="h-3 bg-primary-100 rounded-full w-4/6 animate-pulse" />
        </div>
      </main>
    </div>
  )
}
