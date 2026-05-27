import type { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  attachGuestSessionCookie,
  createGuestSession,
  getGuestSessionIdFromCookies,
  guestActorId,
  readGuestSessionIdFromRequest,
} from '@/lib/ai/guestSession'
import { CLIENT_TIMEZONE_HEADER, normalizeUsageTimezone } from '@/lib/ai/usageTimezone'

export type AIActor = {
  actorId: string
  isRegistered: boolean
  /** IANA timezone from the client (`x-client-timezone`); used for local-midnight resets. */
  timezone: string
  /** Set when a new guest cookie must be attached to the response. */
  newGuestCookie?: string
}

export function resolveTimezoneFromRequest(request: NextRequest): string {
  return normalizeUsageTimezone(request.headers.get(CLIENT_TIMEZONE_HEADER))
}

export async function resolveAIActorFromRequest(request: NextRequest): Promise<AIActor> {
  const timezone = resolveTimezoneFromRequest(request)
  const session = await auth()
  if (session?.user?.id) {
    return { actorId: session.user.id, isRegistered: true, timezone }
  }

  const fromRequest = readGuestSessionIdFromRequest(request)
  if (fromRequest) {
    return { actorId: guestActorId(fromRequest), isRegistered: false, timezone }
  }

  const fromCookies = await getGuestSessionIdFromCookies()
  if (fromCookies) {
    return { actorId: guestActorId(fromCookies), isRegistered: false, timezone }
  }

  const { guestId, signedValue } = createGuestSession()
  return {
    actorId: guestActorId(guestId),
    isRegistered: false,
    timezone,
    newGuestCookie: signedValue,
  }
}

export function applyActorCookie(response: NextResponse, actor: AIActor): void {
  if (actor.newGuestCookie) {
    attachGuestSessionCookie(response, actor.newGuestCookie)
  }
}
