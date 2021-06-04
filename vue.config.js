const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@img': path.resolve(__dirname, 'src/assets/image'),
        '@svg': path.resolve(__dirname, 'src/assets/svg'),
        '@view': path.resolve(__dirname, 'src/views'),
      },
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      filename: 'index.html',
      template: 'public/index.html',
      title: 'Naffiti - NFT Marketplace',
    },
  },
};
