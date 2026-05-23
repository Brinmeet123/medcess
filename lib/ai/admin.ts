import { auth } from '@/lib/auth'

export async function isAdminUser(): Promise<boolean> {
  const session = await auth()
  const username = session?.user?.username?.trim().toLowerCase()
  if (!username) return false

  const allowList = (process.env.ADMIN_USERNAMES ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)

  if (allowList.length > 0) {
    return allowList.includes(username)
  }

  return process.env.NODE_ENV === 'development'
}
