// Derived from https://github.com/petehunt/webpack-howto
//			and http://www.2ality.com/2015/04/webpack-es6.html

var path = require('path');

module.exports = {
	entry: {
		Main: './js/main'
	},

	output: {
		path: './target',
		filename: '[name].js',
		sourceMapFilename: '[name].map',
	},

	module: {
		loaders: [
			{
				test: /\.js.?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
           	}, {
  				test: /\.css$/,
  				loader: 'style-loader!css-loader'
           	}, {
           		test: /\.less$/,
           		loader: 'style-loader!css-loader!less-loader'
      		}
		]
	},

	resolve: {
		root: [
			path.join(__dirname, "js")
//			path.join(__dirname, "node_modules")
		],
		extensions: ['.js', '.json', '.jsx', ''],
		modulesDirectories: ["node_modules"]
	}
};
