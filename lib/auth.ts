import NextAuth from 'next-auth'
import authConfig from '@/lib/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'google') {
        type GoogleProfile = { email?: string; name?: string; picture?: string }
        const p = profile as GoogleProfile | undefined
        const email = (p?.email ?? user?.email)?.trim().toLowerCase()
        if (!email) return token

        const [{ syncGoogleProfileToUser }, { sendWelcomeEmail }] = await Promise.all([
          import('@/lib/googleUserSync'),
          import('@/lib/welcomeEmail'),
        ])

        const synced = await syncGoogleProfileToUser({
          email,
          name: p?.name ?? user?.name ?? null,
          image: p?.picture ?? user?.image ?? null,
        })

        token.id = synced.user.id
        token.username = synced.user.username

        if (synced.isNew) {
          try {
            await sendWelcomeEmail({
              email: synced.user.email,
              name: synced.user.name,
              username: synced.user.username,
            })
          } catch (e) {
            console.error('[auth] welcome email failed:', e)
          }
        }
      } else if (user) {
        token.id = user.id as string
        token.username = (user as { username?: string }).username ?? ''
      }
      return token
    },
  },
})
