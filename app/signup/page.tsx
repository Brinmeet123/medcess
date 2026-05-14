import { Suspense } from 'react'
import Link from 'next/link'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import NextStepGuidance from '@/components/ux/NextStepGuidance'

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h1>
          <p className="text-slate-600 mt-2">
            Sign in with Google to save progress, scores, and vocabulary across devices.
          </p>
        </div>

        <div className="mb-8">
          <NextStepGuidance compact>New here? Pick a case after you sign in — your work is saved automatically.</NextStepGuidance>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
          <Suspense fallback={<div className="text-center text-slate-500">Loading…</div>}>
            <GoogleSignInButton label="Sign up with Google" />
          </Suspense>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-800">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          <Link href="/" className="text-teal-700 hover:text-teal-800 font-medium">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}
