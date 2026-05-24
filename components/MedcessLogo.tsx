import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/branding'
import MedcessECGIcon from '@/components/brand/MedcessECGIcon'

type Size = 'sm' | 'md' | 'lg'

/** Stacked logo (ECG + wordmark) — aspect from transparent asset 558×447. */
const LOGO_ASPECT = 558 / 447

const fullHeights: Record<Size, number> = {
  sm: 36,
  md: 44,
  lg: 72,
}

type Props = {
  size?: Size
  /** SVG ECG + gradient text (no PNG). */
  variant?: 'full' | 'compact'
  showWordmark?: boolean
  href?: string | null
  className?: string
  /** Soft cyan glow behind logo in dark mode (hero / loading). */
  glow?: boolean
}

function CompactLogo({ size, showWordmark }: { size: Size; showWordmark: boolean }) {
  const iconClass = size === 'lg' ? 'h-9 w-auto' : size === 'md' ? 'h-8 w-auto' : 'h-7 w-auto'
  const textClass =
    size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'

  return (
    <>
      <MedcessECGIcon className={iconClass} />
      {showWordmark ? (
        <span className={`${textClass} font-bold tracking-tight text-gradient-medcess`}>{APP_NAME}</span>
      ) : null}
    </>
  )
}

function FullLogo({ size, glow }: { size: Size; glow?: boolean }) {
  const height = fullHeights[size]
  const width = Math.round(height * LOGO_ASPECT)

  return (
    <span
      className={`medcess-logo-wrap relative inline-flex items-center justify-center shrink-0 ${
        glow ? 'medcess-logo-glow-host' : ''
      }`}
    >
      {glow ? (
        <span
          className="pointer-events-none absolute inset-0 -z-10 scale-[1.35] rounded-full bg-primary-400/0 dark:bg-primary-400/20 blur-2xl"
          aria-hidden
        />
      ) : null}
      <Image
        src="/brand/medcess-logo.png"
        alt={APP_NAME}
        width={width}
        height={height}
        className="medcess-logo-img block h-auto w-auto object-contain object-left bg-transparent"
        style={{ height, width: 'auto', maxWidth: width }}
        priority={size === 'lg'}
      />
    </span>
  )
}

export function MedcessLogoMark({ size = 'md' }: { size?: Size }) {
  const iconClass = size === 'lg' ? 'h-10 w-auto' : size === 'md' ? 'h-8 w-auto' : 'h-7 w-auto'
  return <MedcessECGIcon className={iconClass} />
}

export default function MedcessLogo({
  size = 'md',
  variant = 'full',
  showWordmark = true,
  href = '/',
  className = '',
  glow = false,
}: Props) {
  const linked = href != null && href !== ''
  const inner =
    variant === 'compact' ? (
      <CompactLogo size={size} showWordmark={showWordmark} />
    ) : (
      <FullLogo size={size} glow={glow} />
    )

  const layout = `inline-flex items-center gap-2.5 ${className}`

  if (linked) {
    return (
      <Link href={href!} className={`${layout} hover:opacity-90 transition-opacity duration-200`}>
        {inner}
      </Link>
    )
  }

  return <span className={layout}>{inner}</span>
}
