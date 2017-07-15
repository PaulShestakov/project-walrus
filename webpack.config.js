const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = [
	{
		name : 'client',
		devtool: 'inline-source-map',
		entry: {
			app: './src/client/app.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist', 'client'),
			filename: '[name].js'
		},
		resolve: {
			extensions: ['.js', '.jsx'],
			modules: [
				path.resolve('./node_modules'),
				path.resolve('./src/client/components'),
			]
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				// This rule is for css modules files
				{
					test: /\.module\.(css|scss)$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"',
							'sass-loader?sourceMap'
						]
					})
				},
				// This rule is for global css files
				{
					test: /\.global\.(css|scss)$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							"css-loader",
							"sass-loader"
						]
					})

				},
				{
					test: /\.(woff(2)?|svg|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
					exclude: [/img/],
					loader: 'url-loader',
					query: {
						name: '/fonts/[name].[ext]&limit=10000'
					}
				},
				{
					test: /\.(svg|ico)$/,
					loader: 'file-loader',
					query: {
						name: '/images/[name].[ext]'
					}
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/client/index.html'
			}),
			new ExtractTextPlugin({
				filename: 'styles.css',
				allChunks: true
			}),
			//new UglifyJSPlugin(),
		]
	},
	{
		name : 'server',
        devtool: 'inline-source-map',
		entry: {
			index: './src/server'
		},
		target: 'node',
		output: {
			path: path.resolve(__dirname, 'dist', 'server'),
			filename: '[name].js'
		},
		externals: [nodeExternals()],
		resolve: {
			extensions: ['.js', '.ts'],
            modules: [
                path.resolve(__dirname, 'src', 'server'),
                path.resolve('./node_modules')
            ]
		},
		module: {
			rules: [
				// {
				// 	test: /\.ts$/,
				// 	enforce: 'pre',
				// 	loader: 'tslint-loader'
				// },
				{
                    test: /\.tsx?$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				}
			]
		}
	}
];