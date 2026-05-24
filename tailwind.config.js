/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        medcess: {
          cyan: '#14B8FF',
          bright: '#149CFF',
          royal: '#1E5BFF',
          navy: '#061B49',
          surface: '#F8FAFC',
          'dark-bg': '#020817',
          'dark-card': '#071A33',
          'dark-muted': '#0a1f3d',
          'dark-border': '#14345C',
          'dark-text': '#F8FAFC',
          'dark-text-muted': '#CBD5E1',
        },
        primary: {
          50: '#eef9ff',
          100: '#d6f0ff',
          200: '#a8ddff',
          300: '#6ec4ff',
          400: '#14B8FF',
          500: '#149CFF',
          600: '#1E5BFF',
          700: '#1849d4',
          800: '#0f3278',
          900: '#061B49',
        },
      },
      boxShadow: {
        medcess: '0 4px 24px -4px rgba(30, 91, 255, 0.18)',
        'medcess-sm': '0 2px 12px -2px rgba(20, 184, 255, 0.2)',
        'medcess-glow': '0 0 20px rgba(20, 184, 255, 0.35)',
      },
      backgroundImage: {
        'medcess-gradient': 'linear-gradient(90deg, #14B8FF 0%, #149CFF 45%, #1E5BFF 100%)',
        'medcess-gradient-soft':
          'linear-gradient(135deg, rgba(20, 184, 255, 0.14) 0%, rgba(30, 91, 255, 0.08) 50%, transparent 100%)',
        'medcess-hero':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(20, 184, 255, 0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(30, 91, 255, 0.1), transparent 45%)',
        'medcess-hero-dark':
          'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(20, 184, 255, 0.15), transparent 55%), radial-gradient(ellipse 45% 35% at 85% 15%, rgba(30, 91, 255, 0.12), transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease-out',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'ecg-pulse': 'ecgPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        ecgPulse: {
          '0%, 100%': { opacity: '0.85', filter: 'drop-shadow(0 0 0px rgba(20,184,255,0))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(20,184,255,0.45))' },
        },
      },
    },
  },
  plugins: [],
}
