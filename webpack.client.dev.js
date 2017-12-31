const merge = require('webpack-merge');
const commonClientConfig = require('./webpack.client.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(commonClientConfig, {
	devtool: 'inline-source-map',
	// plugins: [
	// 	new BundleAnalyzerPlugin()
	// ]
});
