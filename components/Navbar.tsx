'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { logoutUser } from '@/lib/clientLogout'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import AIUsageHeaderIndicator from '@/components/AIUsageHeaderIndicator'
import MedcessLogo from '@/components/MedcessLogo'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/scenarios', label: 'Scenarios' },
  { href: '/vocab', label: 'Vocab' },
  { href: '/about', label: 'About' },
] as const

export default function Navbar() {
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#020817]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-[#14345C] shadow-medcess-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <MedcessLogo size="md" variant="full" className="shrink-0 bg-transparent" />

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="medcess-nav-link">
                {label}
              </Link>
            ))}

            <AIUsageHeaderIndicator className="flex mx-2 shrink-0" />
            <ThemeToggle className="inline-flex mx-1" />

            {status === 'loading' ? (
              <span className="text-sm text-slate-400 px-2" aria-live="polite">
                Loading
              </span>
            ) : session?.user ? (
              <div className="flex items-center gap-3 pl-3 ml-1 border-l border-slate-200">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-primary-800 hover:text-primary-600 max-w-[140px] truncate transition-colors"
                  title={session.user.email ?? ''}
                >
                  {session.user.name ?? session.user.username ?? 'Profile'}
                </Link>
                <button
                  type="button"
                  onClick={() => void logoutUser()}
                  className="text-sm font-medium text-slate-600 hover:text-medcess-navy transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="medcess-btn-primary text-sm !py-2 !px-4 ml-2">
                Login / Sign Up
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <AIUsageHeaderIndicator className="flex shrink-0" />
            <ThemeToggle compact />
            <button
              type="button"
              className="btn-press p-2 rounded-xl text-medcess-navy hover:bg-primary-50 border border-slate-200"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-slate-100 dark:border-[#14345C] py-3 space-y-1 pb-4 bg-white dark:bg-[#020817]"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-medcess-navy hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="px-3 py-2 sm:hidden">
              <AIUsageHeaderIndicator className="shrink-0" />
            </div>
            {status === 'loading' ? (
              <p className="px-3 py-2 text-sm text-slate-400">Loading</p>
            ) : session?.user ? (
              <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-sm font-medium text-primary-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {session.user.name ?? session.user.username ?? 'Profile'}
                </Link>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600"
                  onClick={() => {
                    setMobileOpen(false)
                    void logoutUser()
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block mx-3 mt-2 medcess-btn-primary text-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
