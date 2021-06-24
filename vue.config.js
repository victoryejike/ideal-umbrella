const path = require('path');

module.exports = {
  crossorigin: 'anonymous',
  integrity: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@img': path.resolve(__dirname, 'src/assets/image'),
        '@svg': path.resolve(__dirname, 'src/assets/svg'),
        '@view': path.resolve(__dirname, 'src/views'),
      },
    },
  },
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      filename: 'index.html',
      template: 'public/index.html',
      title: 'Naffiti - NFT Marketplace',
    },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const newArgs = [{
        ...args,
        __INTLIFY_PROD_DEVTOOLS__: false,
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: true,
      }];
      return newArgs;
    });
  },
};
