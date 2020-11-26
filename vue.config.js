module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/kojima-project/'
    : '/',
    css: {
      loaderOptions: {
        scss: {
          prependData: `
            @import "~@/assets/scss/vars";
            @import "~@/assets/scss/fonts";
            @import "~@/assets/scss/libs";
            `
        }
      }
    }
  }