import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { APP_NAME } from '@/lib/branding'
import ResetPasswordShell from './ResetPasswordShell'

export const dynamic = 'force-dynamic'

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
  const token = resolveToken(searchParams?.token)
  if (token) {
    redirect(`/reset-password/${encodeURIComponent(token)}`)
  }

  return <ResetPasswordShell />
}
