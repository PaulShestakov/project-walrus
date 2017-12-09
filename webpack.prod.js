const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


const clientConfig = merge(common.clientConfig, {
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
});

module.exports = [clientConfig, common.serverConfig];
