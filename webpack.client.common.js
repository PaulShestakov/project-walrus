const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	name : 'client',
	entry: {
		app: './src/client/index.js',
		vendor: [
			// The heaviest libraries
			'react',
			'react-dom',
			'material-ui',
			'material-ui-icons',
			'lodash',
			'moment',
			'redux-form',
			'react-google-maps',
			'i18next',
			'history',
			'react-redux',
			'jss-nested'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'client'),
		filename: '[name].js',
		publicPath: '/'
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
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'sass-loader'
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
				test: /\.(gif|png|jpe?g|svg|ico)$/i,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							webp: {
								quality: 75
							}
						}
					}
				]
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	]
};
