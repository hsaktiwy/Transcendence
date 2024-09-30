/** @type {import('tailwindcss').Config} */
export default {   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'xsm': '421px',
        'xxl': '2020px', // Custom breakpoint at 1400px
        'r-size': '1889',
      },
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
        '0%': {
        transform: 'translateX(100%)'
        }
        ,
        '100%': {transform: 'translateX(0)'}
      },
      notificationDelete:{
        '0%': {transform: 'translateX(0)'},
        '100%': {transform: 'translateX(100%)'}
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      fadeIn: 'fadeIn 1s ease-in-out',
      notificationAnimation: 'notificationAnimation .3s ease-in-out',
      notificationDelete: 'notificationDelete .3s ease-in-out'
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

