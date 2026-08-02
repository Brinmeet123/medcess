/**
 * Seeds the single Medcess admin account.
 *
 * Password is bcrypt-hashed before insert — never stored in plain text.
 * Override credentials with ADMIN_EMAIL / ADMIN_INITIAL_PASSWORD env vars.
 *
 * Usage: node scripts/with-database-env.cjs node scripts/seed-admin.cjs
 */
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const DEFAULT_EMAIL = 'contactmedcess@gmail.com'
const DEFAULT_PASSWORD = 'Brinmeet123'
const DEFAULT_USERNAME = 'medcessadmin'

async function main() {
  const email = (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).trim().toLowerCase()
  const password = process.env.ADMIN_INITIAL_PASSWORD || DEFAULT_PASSWORD
  const username = (process.env.ADMIN_USERNAME || DEFAULT_USERNAME).trim().toLowerCase()

  if (!password || password.length < 8) {
    console.error('Admin password must be at least 8 characters.')
    process.exit(1)
  }

  const prisma = new PrismaClient()
  try {
    const passwordHash = await bcrypt.hash(password, 12)

    const existingByEmail = await prisma.user.findUnique({ where: { email } })
    const existingByUsername = await prisma.user.findUnique({ where: { username } })

    if (existingByEmail) {
      await prisma.user.update({
        where: { email },
        data: {
          password: passwordHash,
          role: 'admin',
          name: existingByEmail.name || 'Medcess Admin',
        },
      })
      // Demote any other admins so only this account remains admin.
      await prisma.user.updateMany({
        where: { role: 'admin', NOT: { email } },
        data: { role: 'user' },
      })
      console.log(`Updated admin account: ${email} (password re-hashed, role=admin)`)
    } else if (existingByUsername && existingByUsername.email !== email) {
      console.error(
        `Username "${username}" is already taken by another account. Set ADMIN_USERNAME to a free value.`
      )
      process.exit(1)
    } else {
      await prisma.user.create({
        data: {
          email,
          username,
          name: 'Medcess Admin',
          password: passwordHash,
          role: 'admin',
          subscribed: true,
        },
      })
      await prisma.user.updateMany({
        where: { role: 'admin', NOT: { email } },
        data: { role: 'user' },
      })
      console.log(`Created admin account: ${email} (password stored as bcrypt hash)`)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
