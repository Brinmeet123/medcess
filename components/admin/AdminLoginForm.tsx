'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import MedcessLogo from '@/components/MedcessLogo'

export default function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })
      if (res?.error) {
        setError('Invalid email or password.')
        return
      }

      // Confirm admin access before sending to dashboard.
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json().catch(() => null)
      const isAdmin = Boolean(session?.user?.isAdmin)
      if (!isAdmin) {
        setError('This account is not authorized for the admin dashboard.')
        return
      }

      router.push(callbackUrl.startsWith('/admin') ? callbackUrl : '/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MedcessLogo size="lg" variant="full" href="/" glow />
          </div>
          <h1 className="text-2xl font-bold text-medcess-navy dark:text-[#F8FAFC]">Admin sign in</h1>
          <p className="text-sm text-slate-600 dark:text-[#94a3b8] mt-2">
            Authorized administrators only.
          </p>
        </div>

        <div className="medcess-card shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Email</span>
              <input
                type="email"
                autoComplete="username"
                className="medcess-input mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                className="medcess-input mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error ? (
              <p className="text-sm text-red-600 dark:text-red-300" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={loading} className="medcess-btn-primary w-full">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
