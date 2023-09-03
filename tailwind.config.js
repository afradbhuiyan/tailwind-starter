const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './dist/**/*.{html,css,js}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
        margin: 'margin',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'face-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 250ms ease-in-out',
        'fade-in-down': 'fade-in-down 250ms ease-in-out',
        'fade-in': 'fade-in 250ms ease-in-out',
        'fade-out': 'fade-out 250ms ease-in-out',
      },
      colors: {
        'primary': {
          ...colors.violet,
          DEFAULT: '#7c3aed'
        },
        'secondary': {
          ...colors.zinc,
          DEFAULT: '#71717a'
        },
        'success': {
          ...colors.green,
          DEFAULT: '#16a34a'
        },
        'danger': {
          ...colors.red,
          DEFAULT: '#ef4444'
        },
        'info': {
          ...colors.sky,
          DEFAULT: '#0284c7'
        },
        'warning': {
          ...colors.amber,
          DEFAULT: '#f59e0b'
        },
        'dark': {
          ...colors.gray,
          DEFAULT: '#374151'
        },
      },
      minWidth: {
        '1/2': '50%',
      },
      maxWidth: {
        '1/2': '50%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

