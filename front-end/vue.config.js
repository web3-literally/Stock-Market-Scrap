module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  chainWebpack (config) {
    config.plugins.delete('prefetch')
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  configureWebpack: {
    // Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false

    }
  },
  outputDir: './dist',

  // Paths
  publicPath: './',
  assetsDir: './',
  devServer: {
    // proxy: 'https:/13.233.42.88:3000/',
    // products: 'https:/13.233.42.88:3000/',
    // proxy: {
    //     "*":{ "target" : "'https:/13.233.42.88:3000/'"}
    // }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
