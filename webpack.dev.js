const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'), // ✅ perbaikan: ganti dist → src
    },
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    hot: true, // 🔥 enable HMR (optional tapi bagus)
    open: true, // 🚀 auto open browser
    watchFiles: ['src/**/*'], // 👀 pantau perubahan di src/
  },
});
