const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: '#ff5a3a'
    },
    fontFamily: {
      nunito: ['Nunito', 'sans-serif']
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
