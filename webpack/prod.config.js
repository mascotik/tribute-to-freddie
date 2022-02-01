const pathsList = require('./paths')
const { merge } = require('webpack-merge')
const commonConfig = require('./common.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: pathsList.build,
        publicPath: pathsList.publicPath, // Important for html-loader
        filename: 'js/[name].[contenthash].bundle.js',
        assetModuleFilename: pathsList.assetsBuild + '/[contenthash][ext]', // Important for html-loader
        //clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: pathsList.stylesBuild + '/[contenthash].css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        //minimize: true,
        //minimizer: [new OptimizeCssAssetsPlugin(), "..."],
        // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
        // instead of having their own. This also helps with long-term caching, since the chunks will only
        // change when actual code changes, not the webpack runtime.
        runtimeChunk: {
            name: 'runtime',
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})