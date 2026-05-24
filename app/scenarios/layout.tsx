import type { Metadata } from 'next'
import { APP_NAME, TAGLINE_SHORT } from '@/lib/branding'

export const metadata: Metadata = {
  title: 'Cases',
  description: TAGLINE_SHORT,
  openGraph: {
    title: `Cases · ${APP_NAME}`,
    description: TAGLINE_SHORT,
  },
}

export default function ScenariosLayout({ children }: { children: React.ReactNode }) {
  return children
}
