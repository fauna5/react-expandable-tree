/* eslint no-console: off */
/* global module, __dirname */

const path = require('path')
var StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = function (env) {
	console.log('\nMODE is', env)
	let entry = "./src/nav.jsx"

	if (env === 'dev') {
		entry = "./index.jsx"
	}
	console.log('entry is', entry, '\n')

	return {
		plugins: [
			new StyleLintPlugin({
				configFile: path.join(__dirname, '.stylelintrc'),
				files: ['**/*css']
			})
		],
		entry,
		output: {
			path: __dirname,
			filename: "lib/bundle.js",
			library: "WebpackExpandableTree",
			libraryTarget: 'umd',
			umdNamedDefine: true
		},
		module: {
			loaders: [{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {presets: ['es2015', 'react', 'stage-1']}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {presets: ['es2015']}
			}]
		}
	}
}
