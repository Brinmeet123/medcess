import { auth } from '@/lib/auth'

/** Single authorized admin email. Override with ADMIN_EMAIL in env if needed. */
export const DEFAULT_ADMIN_EMAIL = 'contactmedcess@gmail.com'

export function getAdminEmail(): string {
  const fromEnv = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (fromEnv) return fromEnv
  return DEFAULT_ADMIN_EMAIL
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return email.trim().toLowerCase() === getAdminEmail()
}

/**
 * True when the signed-in user is the single admin account (by email).
 */
export async function isAdminUser(): Promise<boolean> {
  const session = await auth()
  return isAdminEmail(session?.user?.email)
}

export async function requireAdmin(): Promise<{ ok: true } | { ok: false; status: 401 | 403 }> {
  const session = await auth()
  if (!session?.user) return { ok: false, status: 401 }
  if (!isAdminEmail(session.user.email)) return { ok: false, status: 403 }
  return { ok: true }
}
