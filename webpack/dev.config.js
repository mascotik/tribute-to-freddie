const path = require('path');

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./common.config');
const paths = require('./paths');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      watch: true,
    },
    historyApiFallback: true,  // 404 -> index
    watchFiles: ['src/**/*.html'],
    open: true,
    //compress: true,
    //hot: true,
    port: 3000,

  },

  plugins: [
    // Only update what has changed on hot reload
    //new webpack.HotModuleReplacementPlugin(),
  ],
})