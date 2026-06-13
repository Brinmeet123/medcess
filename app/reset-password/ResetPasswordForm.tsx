'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const INVALID_TOKEN_MESSAGE = 'This password reset link is invalid or has expired.'
const MISSING_TOKEN_MESSAGE =
  'This reset link is missing its token. Use the button in your email, or request a new link below.'

type ResetPasswordFormProps = {
  initialToken?: string
}

function readTokenFromPathname(pathname: string): string {
  const match = pathname.match(/^\/reset-password\/([^/?#]+)/)
  if (!match?.[1]) return ''
  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

function readTokenFromSearch(search: string): string {
  const value = new URLSearchParams(search).get('token')
  if (!value) return ''
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export default function ResetPasswordForm({ initialToken = '' }: ResetPasswordFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const token = useMemo(() => {
    if (initialToken) return initialToken

    const fromPath = pathname ? readTokenFromPathname(pathname) : ''
    if (fromPath) return fromPath

    const fromQuery = searchParams?.get('token')
    if (fromQuery) {
      try {
        return decodeURIComponent(fromQuery)
      } catch {
        return fromQuery
      }
    }

    if (typeof window !== 'undefined') {
      return readTokenFromSearch(window.location.search)
    }

    return ''
  }, [initialToken, pathname, searchParams])

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError(MISSING_TOKEN_MESSAGE)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : INVALID_TOKEN_MESSAGE)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <div
          className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="status"
        >
          Your password has been reset successfully. Redirecting to login…
        </div>
        <Link href="/login" className="medcess-btn-primary w-full inline-block text-center">
          Go to login
        </Link>
      </>
    )
  }

  const showMissingToken = !token && !error

  return (
    <>
      {(showMissingToken || error) && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            error && token
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-amber-200 bg-amber-50 text-amber-900'
          }`}
          role={error ? 'alert' : 'status'}
        >
          {error ?? MISSING_TOKEN_MESSAGE}{' '}
          {!token && (
            <Link href="/forgot-password" className="font-medium text-primary-700 hover:text-primary-800">
              Request a new link
            </Link>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 mb-1">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
          />
          <p className="text-xs text-slate-500 mt-1">At least 8 characters.</p>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
          />
        </div>
        <button type="submit" disabled={loading} className="medcess-btn-primary w-full disabled:opacity-60">
          {loading ? 'Resetting…' : 'Reset password'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Back to login
        </Link>
      </p>
    </>
  )
}
