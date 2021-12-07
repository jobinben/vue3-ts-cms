module.exports = {
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
