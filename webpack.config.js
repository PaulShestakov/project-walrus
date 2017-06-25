const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/client/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(svg)$/,
                use: 'file-loader?name=/images/[name].[ext]'
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
}