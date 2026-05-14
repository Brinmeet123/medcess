import { getResend, getResendFromAddress, warnIfDefaultFromInProduction } from '@/lib/resend'

export async function sendWelcomeEmail(params: {
  email: string
  name: string | null
  username: string
}): Promise<void> {
  const resend = getResend()
  if (!resend) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[resend] RESEND_API_KEY is missing or empty; welcome email was not sent.')
    }
    return
  }

  const displayName = params.name?.trim() || params.username
  warnIfDefaultFromInProduction()
  const result = await resend.emails.send({
    from: getResendFromAddress(),
    to: params.email,
    subject: 'Welcome to Virtual Diagnostic Simulator',
    html: welcomeHtml(displayName),
    text: welcomePlainText(displayName),
  })
  if (result.error) {
    const err = result.error
    console.error('[resend] welcome email rejected:', {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
    })
  } else if (result.data?.id) {
    console.info('[resend] welcome email accepted, id:', result.data.id)
  }
}

function welcomeHtml(displayName: string): string {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b;">
    <h1 style="color: #0f766e;">Welcome${displayName ? `, ${escapeHtml(displayName)}` : ''}!</h1>
    <p>Thank you for joining the <strong>Virtual Diagnostic Simulator</strong>.</p>
    <p>Your saved terms and scenario scores live on your dashboard.</p>
    <p>We will also share occasional updates about new cases and—down the road—shadowing and observation opportunities.</p>
    <p style="margin-top: 24px; font-size: 14px; color: #64748b;">— The VDS team</p>
  </body>
</html>`
}

function welcomePlainText(displayName: string): string {
  const greeting = displayName ? `Welcome, ${displayName}!` : 'Welcome!'
  return `${greeting}

Thank you for joining the Virtual Diagnostic Simulator.

Your saved terms and scenario scores live on your dashboard.

We will also share occasional updates about new cases and—down the road—shadowing and observation opportunities.

— The VDS team`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
