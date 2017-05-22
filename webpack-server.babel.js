import path from 'path';
import webpack from 'webpack';
import ModernizrPlugin from 'modernizr-webpack-plugin';
import Package from './package.json';
import Vendor from './vendor.json';
const config = {
	cache: true,
	debug: true,
    devtool: 'cheap-module-eval-source-map',
	entry:  {
		api: './server/api.js'
	},
	output: {
		filename: '[name].js',
		path:     path.join(__dirname, 'dist-server')
	},
	plugins: [
		new webpack.DefinePlugin({
            __CLIENT__:     false,
            __SERVER__:     true,
            __PRODUCTION__: false,
            __DEV__:        true,
            __VERSION__: JSON.stringify(Package.version),
            __APPNAME__: JSON.stringify(Package.name)
		}),
		new webpack.ExtendedAPIPlugin()
	],
	module: {
		postLoaders: [{
			exclude: /node_modules/,
			loader:  'babel-loader',
			test:    /\.js?$/
		}],
		loaders: [{
			test: /jquery\.js$/,
			loader: "babel-loader"
		}, {
	        test: /\.json$/,
	        loader: 'json-loader'
	      }
		]
	},
	resolve: {
		root: [
			path.resolve('./server')
		]
	}
};

export default config;