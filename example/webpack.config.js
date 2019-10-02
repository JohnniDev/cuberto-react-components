const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname, 'src/index.js')
	],
	resolve: {
		alias: {
			react: path.resolve('./node_modules/react'),
			'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
		new CopyWebpackPlugin([
			{ from: './src/index.html', to: 'index.html' },
			{ from: './src/main.css', to: 'main.css' },
			{ from: './node_modules/bulma/css/bulma.min.css', to: 'bulma.min.css' }
		])
	],
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
		filename: './build.js'
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		contentBase: './dist',
		port: 8080
	},
	devtool: 'eval-source-map',
};
