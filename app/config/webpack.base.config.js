const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
    return merge([
        {
            entry: ['@babel/polyfill', APP_DIR],
            output: {
                path: path.resolve(__dirname, '../dist'),
                publicPath: '/',
                filename: '[name].js'
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json']
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            module: {
                rules: [
                    { test: /\.tsx?$/, loader: 'ts-loader' },
                    { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
                    {
                        test: /\.scss$/,
                        use: [
                            env.PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    filename: 'index.html',
                }),
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
                }),
                new CopyWebpackPlugin([ { from: 'src/static' } ])
            ],
        }
    ]);
};