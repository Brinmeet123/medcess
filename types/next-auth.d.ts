import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      username: string
      isAdmin?: boolean
    }
  }

  interface User {
    username?: string | null
    isAdmin?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    username?: string
    email?: string
    isAdmin?: boolean
  }
}
