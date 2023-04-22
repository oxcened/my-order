module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFEFEB',
          200: '#FFDFD8',
          500: '#ff5a3a'
        }
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
};
