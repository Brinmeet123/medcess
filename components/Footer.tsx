import Link from 'next/link'
import { APP_NAME, DISCLAIMER_SHORT, TAGLINE_SHORT } from '@/lib/branding'
import MedcessLogo from './MedcessLogo'
import MedcessDivider from './brand/MedcessDivider'

export default function Footer() {
  return (
    <footer className="bg-medcess-surface dark:bg-[#020817] border-t border-slate-200/90 dark:border-[#14345C] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MedcessDivider className="mb-10 max-w-md mx-auto" />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-8">
          <div className="max-w-sm">
            <MedcessLogo size="md" variant="full" href="/" />
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{TAGLINE_SHORT}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/scenarios"
              className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
            >
              Cases
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
              Sign in
            </Link>
          </nav>
        </div>
        <div className="text-center sm:text-left text-sm text-slate-600 border-t border-slate-200 pt-6">
          <p className="mb-2">
            <strong className="text-medcess-navy">{DISCLAIMER_SHORT}</strong>
          </p>
          <p className="mb-4">No real patients. For health concerns, see a licensed clinician.</p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {APP_NAME}. Educational simulation only.
          </p>
        </div>
      </div>
    </footer>
  )
}
