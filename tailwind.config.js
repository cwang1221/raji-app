module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
    minHeight: {
      16: '4rem'
    }
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      ringWidth: ['hover'],
      margin: ['group-hover'],
      scale: ['group-hover']
    }
  },
  plugins: [],
  important: true
}
