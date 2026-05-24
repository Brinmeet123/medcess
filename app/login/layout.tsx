import type { Metadata } from 'next'
import { APP_NAME } from '@/lib/branding'

export const metadata: Metadata = {
  title: 'Sign in',
  description: `Sign in to ${APP_NAME} to save progress, scores, and vocabulary across devices.`,
  openGraph: {
    title: `Sign in · ${APP_NAME}`,
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
