import { APP_NAME } from '@/lib/branding'
import { MedcessLogoMark } from './MedcessLogo'

/** Shown while the async session shell resolves (keeps root layout synchronous for stable dev HMR). */
export default function RootLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="h-16 border-b border-slate-200 bg-white shadow-sm flex items-center px-4 sm:px-6">
        <MedcessLogoMark size="sm" />
        <span className="ml-2.5 text-lg font-bold text-slate-900">{APP_NAME}</span>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 animate-pulse-soft">
          <MedcessLogoMark size="lg" />
          <p className="text-sm text-slate-500">Loading {APP_NAME}…</p>
        </div>
        <div className="mt-12 w-full max-w-md space-y-3" aria-hidden>
          <div className="h-4 bg-slate-200/80 rounded w-full animate-pulse" />
          <div className="h-4 bg-slate-200/80 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-slate-200/80 rounded w-4/6 animate-pulse" />
        </div>
      </main>
    </div>
  )
}
