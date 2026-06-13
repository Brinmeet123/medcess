import type { Metadata } from 'next'
import Link from 'next/link'
import MedcessLogo from '@/components/MedcessLogo'
import { APP_NAME } from '@/lib/branding'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot password',
  description: `Request a password reset link for your ${APP_NAME} account.`,
  openGraph: {
    title: `Forgot password · ${APP_NAME}`,
  },
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MedcessLogo size="lg" variant="full" href="/" glow />
          </div>
          <h1 className="text-3xl font-bold text-medcess-navy tracking-tight">Forgot password</h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="medcess-card shadow-xl p-8 md:p-10">
          <ForgotPasswordForm />
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
