import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { resetPasswordSchema } from '@/lib/passwordValidation'
import { hashResetToken } from '@/lib/passwordReset'

const INVALID_TOKEN_MESSAGE = 'This password reset link is invalid or has expired.'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = resetPasswordSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors
      const first =
        Object.values(msg)
          .flat()
          .find(Boolean) ?? 'Invalid input'
      return NextResponse.json({ error: first }, { status: 400 })
    }

    const { token, password } = parsed.data
    const tokenHash = hashResetToken(token)

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: {
        id: true,
        userId: true,
        expiresAt: true,
        usedAt: true,
      },
    })

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt <= new Date()) {
      return NextResponse.json({ error: INVALID_TOKEN_MESSAGE }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
      prisma.passwordResetToken.deleteMany({
        where: {
          userId: resetToken.userId,
          usedAt: null,
          id: { not: resetToken.id },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Your password has been reset successfully.',
    })
  } catch (e) {
    console.error('[reset-password] unexpected error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
