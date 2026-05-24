import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './styles/globals.css'
import SessionRoot from '@/components/SessionRoot'
import RootLoadingFallback from '@/components/RootLoadingFallback'
import ThemeScript from '@/components/ThemeScript'
import { APP_NAME, META_DESCRIPTION, TAGLINE_SHORT } from '@/lib/branding'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-[#020817] text-medcess-navy dark:text-[#F8FAFC] antialiased transition-colors duration-200`}
      >
        <Suspense fallback={<RootLoadingFallback />}>
          <SessionRoot>{children}</SessionRoot>
        </Suspense>
      </body>
    </html>
  )
}
