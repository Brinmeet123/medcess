import Link from 'next/link'
import { APP_NAME, DISCLAIMER_SHORT, TAGLINE_SHORT } from '@/lib/branding'
import MedcessLogo from './MedcessLogo'

export default function Footer() {
  return (
    <footer className="bg-slate-50/90 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-8">
          <div className="max-w-sm">
            <MedcessLogo size="sm" href="/" />
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{TAGLINE_SHORT}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/scenarios" className="text-slate-600 hover:text-primary-700 font-medium transition">
              Cases
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-primary-700 font-medium transition">
              About
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-primary-700 font-medium transition">
              Sign in
            </Link>
          </nav>
        </div>
        <div className="text-center sm:text-left text-sm text-slate-600 border-t border-slate-200 pt-6">
          <p className="mb-2">
            <strong>{DISCLAIMER_SHORT}</strong>
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
