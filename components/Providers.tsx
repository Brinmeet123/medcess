'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'

type Props = {
  children: ReactNode
  /** From `auth()` in the root layout so the first paint does not depend on `/api/auth/session`. */
  session: Session | null
}

export default function Providers({ children, session }: Props) {
  return (
    <ThemeProvider>
      <SessionProvider
        session={session ?? undefined}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
      >
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}
