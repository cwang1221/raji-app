const CracoLessPlugin = require('craco-less')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#6D28D9',
              '@border-radius-base': '5px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
