module.exports = {
  devServer: {
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  chainWebpack: (config) => {
    config.module.rules.delete('eslint')
  }
}
