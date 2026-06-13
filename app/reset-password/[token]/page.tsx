import type { Metadata } from 'next'
import { APP_NAME } from '@/lib/branding'
import ResetPasswordShell from '../ResetPasswordShell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Reset password',
  description: `Set a new password for your ${APP_NAME} account.`,
  openGraph: {
    title: `Reset password · ${APP_NAME}`,
  },
}

function decodeTokenParam(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export default function ResetPasswordTokenPage({ params }: { params: { token: string } }) {
  return <ResetPasswordShell initialToken={decodeTokenParam(params.token)} />
}
