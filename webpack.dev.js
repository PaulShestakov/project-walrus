const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const clientConfig = merge(common.clientConfig, {
	devtool: 'inline-source-map',
	plugins: [
		new BundleAnalyzerPlugin()
	]
});

module.exports = [clientConfig, common.serverConfig];
