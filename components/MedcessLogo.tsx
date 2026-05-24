import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/branding'
import MedcessECGIcon from '@/components/brand/MedcessECGIcon'

type Size = 'sm' | 'md' | 'lg'

/** Full logo image heights (includes ECG + wordmark). */
const fullHeights: Record<Size, number> = {
  sm: 32,
  md: 40,
  lg: 56,
}

const fullWidths: Record<Size, number> = {
  sm: 120,
  md: 150,
  lg: 210,
}

type Props = {
  size?: Size
  /** Use ECG icon + gradient wordmark instead of the full PNG (compact nav). */
  variant?: 'full' | 'compact'
  showWordmark?: boolean
  href?: string | null
  className?: string
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

function FullLogo({ size }: { size: Size }) {
  const h = fullHeights[size]
  const w = fullWidths[size]
  return (
    <Image
      src="/brand/medcess-logo.png"
      alt={APP_NAME}
      width={w}
      height={h}
      className="h-auto w-auto max-h-full object-contain object-left"
      style={{ height: h, width: 'auto', maxWidth: w }}
      priority={size === 'lg'}
    />
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
}: Props) {
  const linked = href != null && href !== ''
  const inner =
    variant === 'compact' ? (
      <CompactLogo size={size} showWordmark={showWordmark} />
    ) : (
      <FullLogo size={size} />
    )

  const layout = `inline-flex items-center gap-2.5 ${className}`

  if (linked) {
    return (
      <Link href={href!} className={`${layout} hover:opacity-92 transition-opacity duration-200`}>
        {inner}
      </Link>
    )
  }

  return <span className={layout}>{inner}</span>
}
