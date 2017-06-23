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
    devtool: false,
	plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
		new webpack.ExtendedAPIPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false,
			output: {
				comments: false
			},
			compressor: {
				warnings: false
			}
		})
	],
	node: {
		fs: "empty"
	},
	module: {
		rules: [
		{
			exclude: /node_modules/,
		 	// exclude: /node_modules\/(?!(striptags)\/).*/,
		 	// exclude: /node_modules(?!\/my-es6-raw-module)/
			// include: [/node_modules\/striptags/],
			use:  [
				{
					loader: 'babel-loader'
				}
			],
			test:    /\.js?$/,
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

export default config;