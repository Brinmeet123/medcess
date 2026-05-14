import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from '@/lib/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl
  if (!req.auth && pathname.startsWith('/dashboard')) {
    const login = new URL('/login', req.url)
    login.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(login)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*'],
}
