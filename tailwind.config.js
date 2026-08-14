/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#111317', // Dark Navy / Black Background
          primary:   '#C8F13A', // Neon Lime/Green — Primary CTAs & Logo Icon
          secondary: '#AED125', // Olive Lime
          surface:   '#263230', // Muted Card Surface
          accent:    '#16436D', // Dark Sport Blue
          light:     '#FAFBFA', // Off-White / High Contrast Text
          muted:     '#D4D8D3', // Muted Gray / Borders
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':  'linear-gradient(135deg, #040B1A 0%, #16436D 60%, #040B1A 100%)',
        'card-gradient':  'linear-gradient(145deg, rgba(38,50,48,0.9), rgba(4,11,26,0.95))',
        'brand-gradient': 'linear-gradient(90deg, #C8F13A, #AED125)',
      },
      animation: {
        'fade-in':        'fadeIn 0.4s ease-out',
        'slide-up':       'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow':     'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':          'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'brand':  '0 0 30px rgba(200,241,58,0.2)',
        'accent': '0 0 30px rgba(22,67,109,0.4)',
        'glass':  '0 8px 32px rgba(0,0,0,0.5)',
        'card':   '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
