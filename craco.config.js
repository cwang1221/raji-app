const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'rgb(97, 39, 202)',
              '@border-radius-base': '5px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
