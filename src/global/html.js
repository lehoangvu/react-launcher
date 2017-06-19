import React from 'react';
import Helmet from 'react-helmet';

function Html({ content, state, styles }) {
	const head = Helmet.rewind();

	return (
		<html className="no-js" lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				{head.base.toComponent()}
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
				{head.script.toComponent()}
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
				<link rel="apple-touch-icon" href="apple-touch-icon.png" />
				<style dangerouslySetInnerHTML={{ __html: styles }} />
				<script async src="/public/dist/modernizr.js" />
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={{ __html: content }} />
				<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)};` }} />
				<script src="/public/dist/vendor.js" />
				<script src="/public/dist/client.js" />
			</body>
		</html>
	);
}

Html.propTypes = {
	content: React.PropTypes.string.isRequired,
	state: React.PropTypes.object.isRequired,
	styles: React.PropTypes.string.isRequired
};

export default Html;