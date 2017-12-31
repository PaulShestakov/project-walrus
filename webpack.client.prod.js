const merge = require('webpack-merge');
const commonClientConfig = require('./webpack.client.common.js');
const webpack = require('webpack');


module.exports = merge(commonClientConfig, {
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
