import path from 'path'
import Express from 'express'
import compression from 'compression'
import React from 'react'
import { Provider } from 'react-redux'
import counterApp from './../src/store/reducer'
import store from './../src/store'
import Routes from './../src/routes'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import WithStylesContext from './../src/global/WithStylesContext'
import { Router, Route, IndexRoute, browserHistory, hashHistory, match, RouterContext } from 'react-router'
import Html from './../src/global/html';
import config from './../src/config';
import helper from './../src/global/helper';
import _$ from './Helper/fetch';

global["config"] = config;
global["Helper"] = helper;
global["$"] = {
	ajax: (opt = {}) => {
		return false; 
	}
}
const app = Express()

app.use((req,res,next) => { 
   req.url = req.url.replace(/[/]+/g, '/'); 
   next(); 
});

app.use(compression({filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}}));

app.use('/public', Express.static('./public'))
app.use('/dist', Express.static('./dist'))


// This is fired every time the server side receives a request
app.use(handleRender)

function getPreNeeds(store, renderProps, token) {
	let promises = [];
	renderProps.components.forEach(component => {
		let preNeeds = null;
		if (component) {
			preNeeds = component.preNeed;
		}
		if (preNeeds) {
			if(Array.isArray(preNeeds)) {
				preNeeds.map((preNeed) => {
					promises.push(store.dispatch(preNeed(token, renderProps)));
				})
			} else {
				promises.push(store.dispatch(preNeeds(token, renderProps)));
			}
		}
	});
	return promises;
}

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
	match({
		location: req.url,
		routes: Routes
	}, (error, redirectionLocation, renderProps) => {
		if (error) {
			console.error('Router error:', error);
			res.status(500).send(error.message);
		} else if (redirectionLocation) {
			res.redirect(302, redirectionLocation.pathname + redirectionLocation.search);
		} else if (renderProps) {
			const preNeeds = getPreNeeds(store, renderProps, null);
			if (preNeeds.length > 0) {
				Promise.all(preNeeds)
				.then(() => renderHtml(store, renderProps))
				.then(html => res.status(200).send(html))
				.catch(err => res.status(500).send(err.message));
			} else {
				res.send(renderHtml(store, renderProps));
			}
		} else {
			res.status(400).send('Not Found');
		}
	});

}

function renderHtml(store, renderProps) {
	/* eslint no-underscore-dangle: ["error", { "allow": ["_getCss"] }] */
	const css = new Set();
	const content = renderToStaticMarkup(
		<Provider store={store}>
			<WithStylesContext
				onInsertCss={(...styles) => {
					styles.forEach(style => css.add(style._getCss()));
				}}
			>
				<RouterContext {...renderProps} />
			</WithStylesContext>
		</Provider>
	);
	const styles = [...css].join('');
	const template = renderToStaticMarkup(
		<Html content={content} state={store.getState()} styles={styles} />
	);
	// return `<!doctype html>\n${template}`;
	return template;
}


app.listen(process.env.PORT || 5000); //the port you want to use
console.log('SERVER ready !');