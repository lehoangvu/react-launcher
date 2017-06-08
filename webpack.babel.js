import path from 'path';
import webpack from 'webpack';
import ModernizrPlugin from 'modernizr-webpack-plugin';
import Package from './package.json';

import {Vendor, VendorArr} from './vendor.js';

const config = {
	cache: true,
	entry:  {
		vendor: VendorArr,
		bundle: './src/bundle.js',
	},
	output: {
		filename: '[name].js',
		path:     path.join(__dirname, 'dist')
	},
    devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.ExtendedAPIPlugin(),
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery',

		// })
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			output: {
				comments: false
			},
			compressor: {
				warnings: false
			}
		})
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "vendor",
		// 	minChunks: Infinity,
		// })
	],
	node: {
		fs: "empty"
	},
	module: {
		rules: [
		// {
		// 	enforce: "pre",
		// 	exclude: /node_modules/,
		// 	loader:  'eslint-loader',
		// 	test:    /\.js?$/
		// },
		{
			exclude: /node_modules/,
			use:  ['babel-loader'],
			test:    /\.js?$/
		}, {
			test: /jquery\.js$/,
			use: ["babel-loader"]
		},{
			test: /\.scss$/,
			use: [
				{loader: 'isomorphic-style-loader'},
				{loader: 'css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]'},
				{loader: 'postcss-loader'},
				{loader: 'sass-loader'}
			]
		},{
			test: /\.css$/,
			use: [
				{loader: 'isomorphic-style'},
				{loader: 'css?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]'},
				{
					loader: 'postcss',
					options: {
						plugins: (loader) => [
						require('postcss-import')({ root: loader.resourcePath }),
						require('postcss-custom-properties')(),
						require('postcss-calc')(),
						require('postcss-nesting')(),
						require('postcss-flexbugs-fixes')(),
						require('autoprefixer')()
						]
					}
				}
			]
		}
		]
	},
	resolve: {
		// root: [
		// 	path.resolve('./src')
		// ]
		modules: [
			path.join(__dirname, "src"),
			"node_modules"
		]
	}
};

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ 
	name: 'vendor',
	minChunks: Infinity
}));

// config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ 
// 	names: VendorArr,
// 	minChunks: Infinity
// }));



export default config;