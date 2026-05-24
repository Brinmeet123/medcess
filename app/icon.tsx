import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

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
          borderRadius: 8,
          background: 'linear-gradient(135deg, #06b6d4 0%, #0d9488 50%, #115e59 100%)',
          color: 'white',
          fontSize: 20,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        M
      </div>
    ),
    { ...size }
  )
}
