/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'xsm': '421px' ,
      }
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      notificationAnimation:{
        '0%': {transform: 'translateX(100%)'},
        '100%': {transform: 'translateX(0)'}
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      fadeIn: 'fadeIn 1s ease-in-out',
      notificationAnimation: 'notificationAnimation .5s ease-in-out'
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

