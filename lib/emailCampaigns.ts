/**
 * Future email campaigns (newsletters, shadowing alerts) — wire Resend here.
 * Keep templates and audience segments in one place as the product grows.
 */
export type EmailCampaignKind = 'newsletter' | 'shadowing_alert'

export const campaignPlaceholders = {
  newsletter: {
    subject: '[Medcess] Clinical reasoning tips',
    description: 'Periodic study tips and product updates.',
  },
  shadowing_alert: {
    subject: '[Medcess] Shadowing opportunities near you',
    description: 'Alerts when shadowing or observation slots are announced.',
  },
} as const
