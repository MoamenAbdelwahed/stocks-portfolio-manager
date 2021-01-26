module.exports = {
  publicPath: '/stocks-portfolio-manager/',
  devServer: {
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  chainWebpack: (config) => {
    config.module.rules.delete('eslint')
  }
}
