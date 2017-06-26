import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

function Html({ content, state, styles }) {
	const head = Helmet.rewind();

	return (
		<html className="no-js" lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
    			<link rel="shortcut icon" type="image/x-icon" href="/public/logo.ico" />
				{head.base.toComponent()}
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
				{head.script.toComponent()}
				<style dangerouslySetInnerHTML={{ __html: styles }} />
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={{ __html: content }} />
				<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)};` }} />
				<script src="/dist/vendor.js" />
				<script src="/dist/bundle.js" />
			    <link rel="stylesheet" href="/public/styles/ionicons.min.css" />
			    <link rel="stylesheet" href="/public/styles/roboto.css" />
			</body>
		</html>
	);
}

Html.propTypes = {
	content: PropTypes.string.isRequired,
	state: PropTypes.object.isRequired,
	styles: PropTypes.string.isRequired
};

export default Html;
