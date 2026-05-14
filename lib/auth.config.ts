import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

/**
 * Edge-safe auth config (middleware). No Prisma / Resend / node:crypto.
 * Full JWT + DB sync lives in {@link ./auth}.
 */
function authSecret(): string | undefined {
  const fromEnv = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  if (fromEnv) return fromEnv
  if (process.env.NODE_ENV === 'development') {
    return 'local-dev-auth-secret-min-32-chars-do-not-use-in-prod'
  }
  return undefined
}

const authConfig = {
  secret: authSecret(),
  trustHost: true,
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = (token.username as string) ?? ''
      }
      return session
    },
  },
} satisfies NextAuthConfig

export default authConfig
