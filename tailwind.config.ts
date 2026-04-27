import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand palette
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bbfc',
          400: '#8196f8',
          500: '#6272f1',
          600: '#4f52e5',
          700: '#4141ca',
          800: '#3636a4',
          900: '#313182',
          950: '#1e1c4c',
        },
        // Neutral palette
        neutral: {
          50: '#f8f8fb',
          100: '#f0f0f5',
          200: '#e2e2ec',
          300: '#c8c8da',
          400: '#9898b4',
          500: '#6e6e8c',
          600: '#55556e',
          700: '#404058',
          800: '#282840',
          900: '#14142b',
          950: '#0a0a1a',
        },
        // Semantic
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        tavern: ['Evanston Tavern 1858', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 20px -4px rgb(98 114 241 / 0.5)',
        'glow-lg': '0 0 40px -8px rgb(98 114 241 / 0.6)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover':
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 40% 20%, hsl(240,100%,74%) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(262,77%,72%) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(355,100%,93%) 0px, transparent 50%)',
        shimmer:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [forms, typography],
}

export default config
