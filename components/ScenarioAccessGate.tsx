'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { isGuestAccessible } from '@/lib/caseAccess'

type Props = {
  scenarioId: string
  children: React.ReactNode
}

/**
 * Guest-playable cases open immediately; all others require an authenticated session.
 * Client-side gate keeps static export builds valid (no server `auth()` on prerendered scenario routes).
 */
export default function ScenarioAccessGate({ scenarioId, children }: Props) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'unauthenticated') return
    if (isGuestAccessible(scenarioId)) return
    const path = `/scenarios/${scenarioId}`
    router.replace(`/login?callbackUrl=${encodeURIComponent(path)}`)
  }, [status, scenarioId, router])

  if (isGuestAccessible(scenarioId)) {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center text-slate-600 text-sm">
        Checking access…
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center text-slate-600 text-sm">
        Redirecting to sign in…
      </div>
    )
  }

  return <>{children}</>
}
