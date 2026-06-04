import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      colors: {
        indigo: colors.indigo,
        purple: colors.purple,
        brand: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#4338ca',
          600: '#3730a3',
          700: '#312e81',
          900: '#1e1b4b',
        },
        primary: '#144f36',
        success: '#22c55e',
        warning: '#F59E0B',
        danger: '#EF4444',
        darkBase: '#0F172A',
        accent: {
          indigo: '#4f46e5',
          success: '#22c55e',
          danger: '#EF4444',
          warning: '#F59E0B',
        }
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card-hover': '0 10px 40px -10px rgba(0,0,0,0.08), 0 4px 12px -2px rgba(0,0,0,0.04)',
        'elevated': '0 20px 50px -12px rgba(0,0,0,0.12)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.15)',
        'glow-strong': '0 0 30px rgba(79, 70, 229, 0.25)',
        'glow-blue': '0 0 25px rgba(59, 130, 246, 0.2)',
        'button': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'button-hover': '0 4px 14px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05)',
        'premium': '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px -2px rgba(0,0,0,0.06)',
        'premium-hover': '0 8px 30px -4px rgba(0,0,0,0.1), 0 4px 10px -2px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'counter': 'counter 1.5s ease-out forwards',
        'shine': 'shine 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        shine: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '100%' },
        },
      }
    },
  },
  plugins: [],
}
