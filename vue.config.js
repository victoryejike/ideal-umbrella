const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@svg': path.resolve(__dirname, 'src/assets/svg'),
        '@img': path.resolve(__dirname, 'src/assets/image'),
        '@view': path.resolve(__dirname, 'src/views'),
      },
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Naffiti - NFT Marketplace',
    },
  },
};
