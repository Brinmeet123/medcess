'use client'

import { APP_NAME } from '@/lib/branding'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

/**
 * Root-level error UI. Must define <html> and <body> (replaces root layout when active).
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#020817] text-medcess-navy dark:text-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold text-gradient-medcess mb-2">{APP_NAME}</p>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm text-slate-600 dark:text-[#CBD5E1] mb-6">
            {error.message || 'Please refresh the page.'}
          </p>
          {error.digest ? (
            <p className="text-xs text-slate-400 mb-4">Reference: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl bg-gradient-medcess px-5 py-2 text-sm font-medium text-white shadow-medcess hover:brightness-105"
          >
            Try again
          </button>
          <p className="mt-6 text-sm text-slate-500 dark:text-[#CBD5E1]">
            <a href="/" className="text-primary-600 dark:text-primary-400 underline">
              Go home
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
