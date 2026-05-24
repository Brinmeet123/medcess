import type { Metadata } from 'next'
import { Suspense } from 'react'
import './styles/globals.css'
import SessionRoot from '@/components/SessionRoot'
import RootLoadingFallback from '@/components/RootLoadingFallback'
import { APP_NAME, META_DESCRIPTION, TAGLINE_SHORT } from '@/lib/branding'

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: META_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    'clinical reasoning',
    'medical simulation',
    'virtual patient',
    'pre-med',
    'high school medicine',
    'diagnosis practice',
  ],
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: TAGLINE_SHORT,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: TAGLINE_SHORT,
  },
}

/**
 * Root layout stays synchronous so the dev server can always resolve error/overlay chunks
 * (async root layouts + HMR sometimes trigger "missing required error components, refreshing...").
 * Session + providers live in {@link SessionRoot}.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Suspense fallback={<RootLoadingFallback />}>
          <SessionRoot>{children}</SessionRoot>
        </Suspense>
      </body>
    </html>
  )
}
