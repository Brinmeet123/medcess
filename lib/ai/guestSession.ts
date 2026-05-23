import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'

export const GUEST_SESSION_COOKIE = 'vd_guest_session'

function guestSigningSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'development') {
      return 'local-dev-auth-secret-min-32-chars-do-not-use-in-prod'
    }
    throw new Error('AUTH_SECRET is required for guest AI sessions')
  }
  return secret
}

function signGuestId(guestId: string): string {
  const sig = createHmac('sha256', guestSigningSecret()).update(guestId).digest('base64url')
  return `${guestId}.${sig}`
}

function verifySignedGuestId(value: string): string | null {
  const dot = value.lastIndexOf('.')
  if (dot <= 0) return null
  const guestId = value.slice(0, dot)
  const sig = value.slice(dot + 1)
  if (!/^[a-zA-Z0-9_-]{16,64}$/.test(guestId)) return null
  const expected = createHmac('sha256', guestSigningSecret()).update(guestId).digest('base64url')
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  return guestId
}

export function createGuestSession(): { guestId: string; signedValue: string } {
  const guestId = randomBytes(16).toString('base64url')
  return { guestId, signedValue: signGuestId(guestId) }
}

/** @deprecated Use createGuestSession */
export function createGuestSessionValue(): string {
  return createGuestSession().signedValue
}

export function readGuestSessionIdFromCookieValue(cookieValue: string | undefined): string | null {
  if (!cookieValue) return null
  return verifySignedGuestId(cookieValue)
}

export async function getGuestSessionIdFromCookies(): Promise<string | null> {
  const store = await cookies()
  const raw = store.get(GUEST_SESSION_COOKIE)?.value
  return readGuestSessionIdFromCookieValue(raw)
}

export function readGuestSessionIdFromRequest(request: NextRequest): string | null {
  return readGuestSessionIdFromCookieValue(request.cookies.get(GUEST_SESSION_COOKIE)?.value)
}

export function guestActorId(sessionId: string): string {
  return `guest:${sessionId}`
}

const COOKIE_MAX_AGE = 365 * 24 * 60 * 60

export function attachGuestSessionCookie(response: NextResponse, signedValue: string): void {
  response.cookies.set(GUEST_SESSION_COOKIE, signedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
}
