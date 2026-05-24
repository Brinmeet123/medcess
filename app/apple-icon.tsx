import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: 36,
        }}
      >
        <svg width="120" height="44" viewBox="0 0 88 32" fill="none">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14B8FF" />
              <stop offset="45%" stopColor="#149CFF" />
              <stop offset="100%" stopColor="#1E5BFF" />
            </linearGradient>
          </defs>
          <path
            d="M2 16 H14 L20 5 L26 24 L32 12 L38 16 L44 10 L50 16 H86"
            stroke="url(#g)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #14B8FF, #1E5BFF)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Medcess
        </div>
      </div>
    ),
    { ...size }
  )
}
