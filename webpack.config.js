const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');


module.exports = [
    {
        name : 'Client',
        devtool: 'inline-source-map',
        entry: {
            app: './src/client/app.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist', 'client'),
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
                    test: /\.(svg|ico)$/,
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
    },
    {
        name : 'Server',
        entry: {
            index: './src/server'
        },
        target: 'node',
        externals: [nodeExternals()],
        output: {
            path: path.resolve(__dirname, 'dist', 'server'),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.js', '.ts'],
            modules: [
                './src/server',
                'node_modules',
            ]
        },
        module: {
            rules: [
                {
                    test: /.ts$/,
                    exclude: /node_modules/,
                    loader: 'awesome-typescript-loader'
                }
            ]
        }
    }
];
