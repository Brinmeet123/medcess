import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import MedcessLogo from '@/components/MedcessLogo'
import { APP_NAME } from '@/lib/branding'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Reset password',
  description: `Set a new password for your ${APP_NAME} account.`,
  openGraph: {
    title: `Reset password · ${APP_NAME}`,
  },
}

function resolveToken(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw) return ''
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: { token?: string | string[] }
}) {
  const initialToken = resolveToken(searchParams?.token)

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MedcessLogo size="lg" variant="full" href="/" glow />
          </div>
          <h1 className="text-3xl font-bold text-medcess-navy tracking-tight">Reset password</h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">Choose a new password for your account.</p>
        </div>

        <div className="medcess-card shadow-xl p-8 md:p-10">
          <Suspense fallback={<div className="text-center text-slate-500">Loading…</div>}>
            <ResetPasswordForm initialToken={initialToken} />
          </Suspense>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}
