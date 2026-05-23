import type { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  attachGuestSessionCookie,
  createGuestSession,
  getGuestSessionIdFromCookies,
  guestActorId,
  readGuestSessionIdFromRequest,
} from '@/lib/ai/guestSession'

export type AIActor = {
  actorId: string
  isRegistered: boolean
  /** Set when a new guest cookie must be attached to the response. */
  newGuestCookie?: string
}

export async function resolveAIActorFromRequest(request: NextRequest): Promise<AIActor> {
  const session = await auth()
  if (session?.user?.id) {
    return { actorId: session.user.id, isRegistered: true }
  }

  const fromRequest = readGuestSessionIdFromRequest(request)
  if (fromRequest) {
    return { actorId: guestActorId(fromRequest), isRegistered: false }
  }

  const fromCookies = await getGuestSessionIdFromCookies()
  if (fromCookies) {
    return { actorId: guestActorId(fromCookies), isRegistered: false }
  }

  const { guestId, signedValue } = createGuestSession()
  return {
    actorId: guestActorId(guestId),
    isRegistered: false,
    newGuestCookie: signedValue,
  }
}

export function applyActorCookie(response: NextResponse, actor: AIActor): void {
  if (actor.newGuestCookie) {
    attachGuestSessionCookie(response, actor.newGuestCookie)
  }
}
