import path from 'path';
import webpack from 'webpack';
import ModernizrPlugin from 'modernizr-webpack-plugin';
import Package from './package.json';

import Vendor from './vendor.js';

const config = {
	cache: true,
	entry:  {
		vendor: Vendor,
		bundle: './src/bundle.js',
	},
	output: {
		filename: '[name].js',
		path:     path.join(__dirname, 'dist')
	},
	plugins: [
		new webpack.ExtendedAPIPlugin(),
		new webpack.optimize.CommonsChunkPlugin({ 
			name: 'vendor',
			minChunks: Infinity
		})
	],
	node: {
		fs: "empty"
	},
	module: {
		rules: [
		{
			exclude: /node_modules/,
			use:  ['babel-loader'],
			test:    /\.js?$/
		}, {
			test: /jquery\.js$/,
			use: ["babel-loader"],
			enforce: 'post'
		}, {
			test: /jquery\.js$/,
			use: 'expose-loader?jQuery!expose?$'
		}, {
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
		modules: [
			path.join(__dirname, "src"),
			"node_modules"
		]
	}
};

export default config;
