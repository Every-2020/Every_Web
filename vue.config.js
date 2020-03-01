const path = require('path')

module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/every/',

  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/'))
  },

  devServer: {
    overlay: false
  },

  // outputDir: 'docs'
}