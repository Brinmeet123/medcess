import type { Metadata } from 'next'
import { APP_NAME, META_DESCRIPTION } from '@/lib/branding'

export const metadata: Metadata = {
  title: `About`,
  description: META_DESCRIPTION,
  openGraph: {
    title: `About ${APP_NAME}`,
    description: META_DESCRIPTION,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
