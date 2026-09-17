/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#7A9BE3',
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          card: '#242422'
        }
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-6%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'bounce-soft': 'bounceSoft 3.5s infinite',
        'float': 'floatSlow 5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      }
    },
  },
  plugins: [],
}
