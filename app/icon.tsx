import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/** Favicon — ECG mark with Medcess gradient on white. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 88 32" fill="none">
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
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
