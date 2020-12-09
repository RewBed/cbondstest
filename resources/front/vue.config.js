module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://cbondstest.test/',
          ws: true,
          changeOrigin: true
      },
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/assets'
    : '/',
  outputDir: '../../public/assets',
  indexPath: process.env.NODE_ENV === 'production'
    ? '../../resources/views/spa/index.blade.php'
    : 'index.html',
  css: {
    /*
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/app.sass"`
      }
    }
     */
  }
};
