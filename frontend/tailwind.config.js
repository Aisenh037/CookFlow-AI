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
        // Custom Material Green accent palette
        brand: {
          50: '#eefef4',
          100: '#d7fde4',
          200: '#b1fbc9',
          300: '#76f5a3',
          400: '#3ae377',
          500: '#10ca53', // main accent green
          600: '#07a63e',
          700: '#098234',
          800: '#0d672d',
          900: '#0d5527',
          950: '#043015',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
