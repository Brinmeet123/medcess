import type { Metadata } from 'next'
import { APP_NAME } from '@/lib/branding'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: `Track your clinical case progress on ${APP_NAME}.`,
  openGraph: {
    title: `Dashboard · ${APP_NAME}`,
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
