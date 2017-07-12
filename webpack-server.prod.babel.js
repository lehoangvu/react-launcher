import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import Package from './package.json';

export default {
	target: 'node',
	entry: {
		'server': ['./server/server-render-origin']
	},
	output: {
		filename: '[name].js',
		path:     path.join(__dirname, 'server')
	},
	plugins: [
		new webpack.DefinePlugin({
			__CLIENT__:     false,
			__SERVER__:     true,
			__PRODUCTION__: true,
			__DEV__:        false,
            __VERSION__: JSON.stringify(Package.version),
            __APPNAME__: JSON.stringify(Package.name),
           	__API_URL__: JSON.stringify('https://hoi-dap-api.herokuapp.com/api'),
           	__API_KEY__: JSON.stringify('test'),
           	__COOKIE_KEY__: JSON.stringify('abcd1234')
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
