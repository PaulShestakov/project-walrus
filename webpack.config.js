const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;

let clientConfig = {
	name : 'client',
	devtool: 'inline-source-map',
	entry: {
		app: './src/client/index.js'
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
				test: /\.(svg|ico|png)$/,
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
		})
	]
};

if (nodeEnv === 'production') {
	clientConfig.plugins.push(
		new UglifyJSPlugin()
	);
}




let serverConfig = {
	name : 'server',
	devtool: 'inline-source-map',
	entry: {
		index: './src/server'
	},
	target: 'node',
	node: {
		__dirname: false
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'server'),
		filename: '[name].js'
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.js', '.ts'],
		modules: [
			"./src/server/*",
			'node_modules',
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
				test: /.ts$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader'
			}
		]
	}
};


module.exports = [clientConfig, serverConfig];

