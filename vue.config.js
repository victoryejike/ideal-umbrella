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
  publicPath: '/~kenso/',
  pages: {
    index: {
      entry: 'src/main.js',
      filename: 'index.html',
      template: 'public/index.html',
      title: 'Naffiti - NFT Marketplace',
    },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => [{
      'process.env': {
        ...args[0]['process.env'],
      },
      __INTLIFY_PROD_DEVTOOLS__: false,
    }]);
  },
};
