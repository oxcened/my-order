module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#ff5a3a'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: 'jit'
}
