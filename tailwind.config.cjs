module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fff3f1',
          '100': '#ffe4df',
          '200': '#ffcec5',
          '300': '#ffad9d',
          '400': '#ff7d64',
          '500': '#ff5a3a',
          '600': '#ed3815',
          '700': '#c82b0d',
          '800': '#a5270f',
          '900': '#882714',
          '950': '#4b1004',
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: 'jit'
};
