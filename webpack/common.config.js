const path = require('path');
const pathsList = require('./paths')

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: [pathsList.entry],
  output: {
    path: pathsList.build,
    filename: '[name].bundle.js',
    publicPath: pathsList.publicPath, // Important for html-loader
    assetModuleFilename: pathsList.assetsBuild + '/[name][ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: pathsList.src + '/index.html',
      filename: 'index.html', // output file
      //      publicPath: paths.public,
    }),
  ],
  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require("sass"), // Prefer `dart-sass`
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/sass/mixins.scss',
                './src/sass/functions.scss'
              ]
            },
          },
        ],
      },

      {
        test: /\.html$/,
        use: ["html-loader"],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
}