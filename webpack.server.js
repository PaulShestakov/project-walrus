const path = require('path');

const nodeExternals = require('webpack-node-externals');


module.exports = {
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
			'./src/server/*',
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
};
