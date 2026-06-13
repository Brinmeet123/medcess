import { createHash, randomBytes } from 'crypto'
import { resolveAppOrigin } from '@/lib/appOrigin'
import { APP_NAME, EMAIL_TEAM_SIGNOFF } from '@/lib/branding'
import { getResend, getResendFromAddress, warnIfDefaultFromInProduction } from '@/lib/resend'

const RESET_TOKEN_BYTES = 32

export function generateResetToken(): string {
  return randomBytes(RESET_TOKEN_BYTES).toString('base64url')
}

export function hashResetToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/** Canonical app URL for password reset links (server-only). */
export function getAppUrl(): string {
  return resolveAppOrigin()
}

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<void> {
  const resend = getResend()
  if (!resend) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[resend] RESEND_API_KEY is missing or empty; password reset email was not sent.')
    }
    return
  }

  warnIfDefaultFromInProduction()

  const result = await resend.emails.send({
    from: getResendFromAddress(),
    to: email,
    subject: 'Reset your Medcess password',
    html: passwordResetHtml(resetUrl),
    text: passwordResetPlainText(resetUrl),
  })

  if (result.error) {
    console.error('[resend] password reset email rejected:', {
      name: result.error.name,
      message: result.error.message,
      statusCode: result.error.statusCode,
    })
    return
  }

  if (result.data?.id) {
    console.info('[resend] password reset email accepted, id:', result.data.id)
  }
}

function passwordResetHtml(resetUrl: string): string {
  const safeUrl = escapeHtml(resetUrl)
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b;">
    <h1 style="color: #0891b2;">Reset your ${APP_NAME} password</h1>
    <p>We received a request to reset the password for your ${APP_NAME} account.</p>
    <p>
      <a href="${safeUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0891b2; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Reset password
      </a>
    </p>
    <p style="font-size: 14px; color: #64748b;">This link expires in 30 minutes.</p>
    <p style="font-size: 14px; color: #64748b;">If you did not request a password reset, you can safely ignore this email.</p>
    <p style="margin-top: 24px; font-size: 14px; color: #64748b;">${EMAIL_TEAM_SIGNOFF}</p>
  </body>
</html>`
}

function passwordResetPlainText(resetUrl: string): string {
  return `Reset your ${APP_NAME} password

We received a request to reset the password for your ${APP_NAME} account.

Reset your password: ${resetUrl}

This link expires in 30 minutes.

If you did not request a password reset, you can safely ignore this email.

${EMAIL_TEAM_SIGNOFF}`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
