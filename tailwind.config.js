module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      ringWidth: ['hover'],
      margin: ['group-hover']
    }
  },
  plugins: [],
  important: true
}
