const LOCALHOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '')
}

export function isLocalhostOrigin(originOrUrl: string): boolean {
  try {
    const origin = originOrUrl.startsWith('http')
      ? new URL(originOrUrl).origin
      : originOrUrl
    return LOCALHOST_RE.test(origin)
  } catch {
    return false
  }
}

function isDeployedRuntime(): boolean {
  return (
    Boolean(process.env.VERCEL) ||
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.VERCEL_ENV)
  )
}

function originFromEnvUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined
  try {
    return stripTrailingSlash(new URL(value.trim()).origin)
  } catch {
    return undefined
  }
}

function vercelOrigin(): string | undefined {
  const host = process.env.VERCEL_URL?.trim()
  if (!host) return undefined
  return `https://${host}`
}

/**
 * Canonical app origin for redirects (logout, Auth.js callbacks).
 * Prefers explicit production URL, then non-localhost AUTH_URL, then Vercel host.
 */
export function resolveAppOrigin(options?: {
  headers?: Headers
  /** Auth.js `baseUrl` or request origin fallback */
  fallbackOrigin?: string
}): string {
  const deployed = isDeployedRuntime()
  const explicit = originFromEnvUrl(
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL
  )
  const authEnv = originFromEnvUrl(
    process.env.AUTH_URL ?? process.env.NEXTAUTH_URL
  )
  const fallback = options?.fallbackOrigin
    ? originFromEnvUrl(
        options.fallbackOrigin.startsWith('http')
          ? options.fallbackOrigin
          : `https://${options.fallbackOrigin}`
      )
    : undefined

  if (explicit && (!deployed || !isLocalhostOrigin(explicit))) {
    return explicit
  }

  const host = options?.headers?.get('x-forwarded-host') ?? options?.headers?.get('host')
  const proto = options?.headers?.get('x-forwarded-proto') ?? 'https'
  if (host) {
    const fromRequest = stripTrailingSlash(`${proto}://${host.split(',')[0].trim()}`)
    if (!deployed || !isLocalhostOrigin(fromRequest)) {
      return fromRequest
    }
  }

  if (authEnv && (!deployed || !isLocalhostOrigin(authEnv))) {
    return authEnv
  }

  const vercel = vercelOrigin()
  if (vercel) return vercel

  if (fallback && (!deployed || !isLocalhostOrigin(fallback))) {
    return fallback
  }

  if (authEnv) return authEnv

  return fallback ?? 'http://localhost:3001'
}

/** Post-logout homepage URL on the current site (client-safe). */
export function getClientLogoutUrl(): string {
  if (typeof window === 'undefined') return '/'
  return new URL('/', window.location.origin).href
}

/**
 * Ensures Auth.js does not use a localhost AUTH_URL on Vercel/production.
 * Call once before NextAuth() initializes.
 */
export function sanitizeAuthEnvironment(): void {
  const deployed = isDeployedRuntime()
  const authRaw = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL
  const authOrigin = originFromEnvUrl(authRaw)
  const explicit = originFromEnvUrl(
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL
  )

  let canonical: string | undefined

  if (explicit && (!deployed || !isLocalhostOrigin(explicit))) {
    canonical = explicit
  } else if (authOrigin && (!deployed || !isLocalhostOrigin(authOrigin))) {
    canonical = authOrigin
  } else if (deployed) {
    canonical = vercelOrigin()
  } else if (authOrigin) {
    canonical = authOrigin
  }

  if (canonical) {
    const normalized = stripTrailingSlash(canonical)
    process.env.AUTH_URL = normalized
    process.env.NEXTAUTH_URL = normalized
  } else if (deployed && authOrigin && isLocalhostOrigin(authOrigin)) {
    delete process.env.AUTH_URL
    delete process.env.NEXTAUTH_URL
  }
}
