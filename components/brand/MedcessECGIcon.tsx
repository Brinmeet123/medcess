'use client'

import { useId } from 'react'

/** ECG heartbeat mark — matches official Medcess logo stroke & gradient. */
type Props = {
  className?: string
  /** Stroke width in SVG user units (viewBox height 32). */
  strokeWidth?: number
  title?: string
}

export default function MedcessECGIcon({
  className = 'h-8 w-auto',
  strokeWidth = 3.2,
  title = 'Medcess',
}: Props) {
  const gradientId = useId().replace(/:/g, '')

  return (
    <svg
      className={className}
      viewBox="0 0 88 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14B8FF" />
          <stop offset="45%" stopColor="#149CFF" />
          <stop offset="100%" stopColor="#1E5BFF" />
        </linearGradient>
      </defs>
      <path
        d="M2 16 H14 L20 5 L26 24 L32 12 L38 16 L44 10 L50 16 H86"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
