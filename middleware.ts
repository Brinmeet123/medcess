import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAdminEmail } from '@/lib/adminAuth'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthed = Boolean(req.auth)
  const email = req.auth?.user?.email
  const isAdmin =
    Boolean(req.auth?.user && (req.auth.user as { isAdmin?: boolean }).isAdmin) ||
    (typeof email === 'string' && email.trim().toLowerCase() === getAdminEmail())

  if (pathname.startsWith('/dashboard') && !isAuthed) {
    const login = new URL('/login', req.url)
    login.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(login)
  }

  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    if (isAuthed && isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (!isAuthed) {
      const login = new URL('/admin/login', req.url)
      login.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(login)
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
