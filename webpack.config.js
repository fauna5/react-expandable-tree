
module.exports = {
	entry: "./index.jsx",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style!css"
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
			// },
			// {
			// 	test: /\.svg/,
			// 	loader: 'svg-url-loader'
			}
		]
	}
}