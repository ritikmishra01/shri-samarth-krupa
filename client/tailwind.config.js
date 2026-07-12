/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8f0f9',
          100: '#c5d8f0',
          200: '#9dbde5',
          300: '#74a2da',
          400: '#518ed2',
          500: '#2d7ac9',
          600: '#1a64b0',
          700: '#0F4C81',
          800: '#0a3860',
          900: '#062440',
          950: '#031525',
        },
        medical: {
          blue:  '#0F4C81',
          red:   '#E63946',
          green: '#00B894',
        },
        accent: {
          red:   '#E63946',
          green: '#00B894',
          amber: '#F59E0B',
        },
        dark: {
          DEFAULT: '#0F172A',
          card:    '#1E293B',
          border:  '#334155',
          muted:   '#475569',
        }
      },
      fontFamily: {
        sans:    ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter',   'system-ui', 'sans-serif'],
      },
      animation: {
        'fadeIn':    'fadeIn 0.6s ease-in-out',
        'slideUp':   'slideUp 0.6s ease-out',
        'slideDown': 'slideDown 0.6s ease-out',
        'float':     'float 6s ease-in-out infinite',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow':'bounce 3s infinite',
        'shimmer':   'shimmer 1.5s infinite',
        'countUp':   'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        countUp: {
          '0%':   { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'hero-gradient':  'linear-gradient(135deg, #0F4C81 0%, #0a3060 50%, #061a35 100%)',
        'blue-gradient':  'linear-gradient(135deg, #0F4C81, #1a64b0)',
        'red-gradient':   'linear-gradient(135deg, #E63946, #c62835)',
        'green-gradient': 'linear-gradient(135deg, #00B894, #00a381)',
        'card-gradient':  'linear-gradient(135deg, rgba(15,76,129,0.08), rgba(15,76,129,0.02))',
        'dark-gradient':  'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      },
      boxShadow: {
        'glow':       '0 0 20px rgba(15,76,129,0.35)',
        'glow-lg':    '0 0 40px rgba(15,76,129,0.45)',
        'glow-red':   '0 0 20px rgba(230,57,70,0.35)',
        'glow-green': '0 0 20px rgba(0,184,148,0.35)',
        'card':       '0 4px 24px rgba(0,0,0,0.10)',
        'card-hover': '0 12px 40px rgba(15,76,129,0.20)',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '128': '32rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
