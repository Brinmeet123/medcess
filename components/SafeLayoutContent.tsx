'use client'

import React from 'react'
import HighlightProvider from './HighlightProvider'
import Navbar from './Navbar'
import Footer from './Footer'
import MedcessLogo from './MedcessLogo'

type Props = { children: React.ReactNode }

class LayoutErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Layout error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          <nav className="bg-white shadow-medcess-sm border-b border-slate-200 px-4 py-3">
            <MedcessLogo size="sm" variant="full" href="/" />
          </nav>
          <main className="flex-1 p-6">
            <p className="text-slate-600 mb-4">Part of the app failed to load. Try refreshing the page.</p>
            <a href="/" className="text-primary-600 font-medium hover:text-primary-700">Go home</a>
          </main>
        </div>
      )
    }
    return this.props.children
  }
}

/**
 * Wraps layout content in an error boundary so one failing component doesn’t hide the whole UI.
 */
export default function SafeLayoutContent({ children }: Props) {
  return (
    <LayoutErrorBoundary>
      <HighlightProvider>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </HighlightProvider>
    </LayoutErrorBoundary>
  )
}
