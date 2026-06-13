import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { forgotPasswordEmailSchema } from '@/lib/passwordValidation'
import {
  generateResetToken,
  getAppUrl,
  hashResetToken,
  sendPasswordResetEmail,
} from '@/lib/passwordReset'

const SUCCESS_MESSAGE =
  'If an account exists with this email, a password reset link has been sent.'

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000

function successResponse() {
  return NextResponse.json({ success: true, message: SUCCESS_MESSAGE })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = forgotPasswordEmailSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors
      const first =
        Object.values(msg)
          .flat()
          .find(Boolean) ?? 'Invalid input'
      return NextResponse.json({ error: first }, { status: 400 })
    }

    const emailNorm = parsed.data.email.toLowerCase()

    const user = await prisma.user.findUnique({
      where: { email: emailNorm },
      select: { id: true, email: true },
    })

    if (!user) {
      return successResponse()
    }

    const rawToken = generateResetToken()
    const tokenHash = hashResetToken(rawToken)
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS)

    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    })

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    })

    const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(rawToken)}`

    try {
      await sendPasswordResetEmail(user.email, resetUrl)
    } catch (e) {
      console.error('[forgot-password] failed to send reset email:', e)
    }

    return successResponse()
  } catch (e) {
    console.error('[forgot-password] unexpected error:', e)
    return successResponse()
  }
}
