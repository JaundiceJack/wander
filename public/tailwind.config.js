module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '120': '30rem',
        '136': '34rem',
        '152': '38rem'
      }
    },
    borderWidth: {
      '3': '3px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
