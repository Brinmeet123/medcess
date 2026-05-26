'use client'

import { signOut } from 'next-auth/react'
import { getClientLogoutUrl } from '@/lib/appOrigin'

/**
 * Sign out and return to the homepage on the current origin (never a baked-in localhost).
 * Clears the session via Auth.js before navigating.
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut({ redirect: false })
  } catch (err) {
    console.error('Logout failed:', err)
  }
  window.location.replace(getClientLogoutUrl())
}
