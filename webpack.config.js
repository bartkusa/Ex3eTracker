// Derived from https://github.com/petehunt/webpack-howto
//			and http://www.2ality.com/2015/04/webpack-es6.html

var path = require('path');

module.exports = {
	entry: {
		Main: './js/main'
	},

	output: {
		path: './target',
		filename: '[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.js.?$/,
				loader: 'jsx-loader?harmony'  // loaders can take parameters as a querystring
           	}, {
			// test: path.join(__dirname, 'es6'),
			// loader: 'babel-loader'
			// }, {
           		test: /\.less$/,
           		loader: 'style-loader!css-loader!less-loader' // use ! to chain loaders
           	}, {
  				test: /\.css$/,
  				loader: 'style-loader!css-loader'
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
