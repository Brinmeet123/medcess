import Link from 'next/link'
import { APP_NAME } from '@/lib/branding'

type Size = 'sm' | 'md' | 'lg'

const markSizes: Record<Size, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-9 w-9 text-base',
  lg: 'h-11 w-11 text-lg',
}

const wordSizes: Record<Size, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

type Props = {
  size?: Size
  showWordmark?: boolean
  href?: string
  className?: string
}

function LogoMark({ size }: { size: Size }) {
  return (
    <span
      className={`${markSizes[size]} inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-teal-600 to-teal-800 font-bold text-white shadow-sm shadow-teal-900/20 ring-1 ring-white/20`}
      aria-hidden
    >
      M
    </span>
  )
}

export function MedcessLogoMark({ size = 'md' }: { size?: Size }) {
  return <LogoMark size={size} />
}

export default function MedcessLogo({
  size = 'md',
  showWordmark = true,
  href = '/',
  className = '',
}: Props) {
  const inner = (
    <>
      <LogoMark size={size} />
      {showWordmark ? (
        <span className={`${wordSizes[size]} font-bold tracking-tight text-slate-900`}>{APP_NAME}</span>
      ) : null}
    </>
  )

  const layout = `inline-flex items-center gap-2.5 ${className}`

  if (href) {
    return (
      <Link href={href} className={`${layout} hover:opacity-90 transition-opacity`}>
        {inner}
      </Link>
    )
  }

  return <span className={layout}>{inner}</span>
}
