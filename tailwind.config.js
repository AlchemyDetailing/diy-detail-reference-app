/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#c8a45a',
          400: '#d4b876',
          600: '#b8944a',
        },
        dark: {
          bg: '#080808',
          surface: '#1a1a1a',
          border: '#333333',
        },
        accent: {
          gray: '#888888',
          light: '#f2f0eb',
        },
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow Light', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
