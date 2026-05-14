import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

function usernameBase(email: string, displayName: string | null | undefined): string {
  const fromName = displayName
    ?.trim()
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase()
    .slice(0, 28)
  if (fromName && fromName.length >= 3) return fromName

  const local = (email.split('@')[0] ?? 'user')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase()
  const s = local.slice(0, 28) || 'user'
  return (s.length >= 3 ? s : `user_${s}`).slice(0, 32)
}

async function allocateUniqueUsername(email: string, displayName: string | null | undefined): Promise<string> {
  let base = usernameBase(email, displayName)
  if (base.length < 3) base = 'user'
  const safeBase = base.slice(0, 24)
  for (let n = 0; n < 10_000; n++) {
    const suffix = n === 0 ? '' : `_${n}`
    const candidate = (safeBase + suffix).slice(0, 32)
    const taken = await prisma.user.findUnique({ where: { username: candidate } })
    if (!taken) return candidate
  }
  return `${safeBase.slice(0, 10)}_${Date.now()}`.slice(0, 32)
}

/**
 * Link Google sign-in to a Prisma User (create on first sign-in, update profile on return).
 */
export async function syncGoogleProfileToUser(input: {
  email: string
  name: string | null
  image: string | null
}): Promise<{ user: { id: string; email: string; name: string | null; username: string }; isNew: boolean }> {
  const email = input.email.trim().toLowerCase()
  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: input.name ?? existing.name,
        image: input.image ?? existing.image,
      },
    })
    return {
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        username: updated.username,
      },
      isNew: false,
    }
  }

  const username = await allocateUniqueUsername(email, input.name)
  const password = await bcrypt.hash(randomBytes(32).toString('hex'), 12)

  const created = await prisma.user.create({
    data: {
      email,
      name: input.name,
      image: input.image,
      username,
      password,
      subscribed: true,
    },
  })

  return {
    user: {
      id: created.id,
      email: created.email,
      name: created.name,
      username: created.username,
    },
    isNew: true,
  }
}
