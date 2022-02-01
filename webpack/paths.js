/* Use in webpack configuration */

const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/js/app.js'),
    src: path.resolve(__dirname, '../src'), // Source files
    build: path.resolve(__dirname, '../dist'),// Production build files
    publicPath: '',
    assetsSrc: path.resolve(__dirname, '../src/img'),
    assetsBuild: 'assets',
    stylesBuild: 'styles',

}