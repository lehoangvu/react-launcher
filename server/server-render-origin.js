import path from 'path'
import Express from 'express'
import compression from 'compression'
import React from 'react'
import { Provider } from 'react-redux'
import counterApp from './../src/store/reducer'
import initStore from './../src/store'
import cookieParser from 'cookie-parser'
import Routes from './../src/routes'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import WithStylesContext from './../src/global/WithStylesContext'
import { Router, Route, IndexRoute, browserHistory, hashHistory, match, RouterContext } from 'react-router'
import Html from './../src/global/html';
import config from './../src/config';
import helper from './../src/global/helper';
import { fetchInfoUser, setTokensCookie } from './../src/global/libraries/fetchApi';

global["config"] = config;
global["Helper"] = helper;
global["$"] = {
	ajax: (opt = {}) => {
		return false; 
	}
}

const app = Express()

eval("app.use(require('express-status-monitor')())");
app.use(cookieParser(__COOKIE_KEY__));
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
app.use('/favicon.ico', Express.static('./favicon.ico'))
app.use('/loaderio-a9e0809dcfd872451be241b95e98bfac.txt', Express.static('./loaderio-a9e0809dcfd872451be241b95e98bfac.txt'))


// This is fired every time the server side receives a request
app.use(handleRender)



function getPreNeeds(store, renderProps, token) {
	// let promises = [];

	const needs = renderProps.components.reduce((prev, current) => {
		const result = current ? (current.preNeeds || []).concat(prev) : prev;
		return result;
	}, []);
	const promises = needs.map(need => store.dispatch(need(token, renderProps)));
	return promises;
}
function getNeeds(store, renderProps, token) {
	let promises = [];
	renderProps.components.forEach(component => {
		let need = null;
		if (component) {
			need = component.preNeed;
		}
		if (need) {
			if(Array.isArray(need)) {
				need.map((preNeed) => {
					promises.push(store.dispatch(preNeed(token, renderProps)));
				});
			} else {
				promises.push(store.dispatch(need(token, renderProps)));
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
		console.log('match:', req.url);
		if (error) {
			console.error('Router error:', error);
			res.status(500).send(error.message);
		} else if (redirectionLocation) {
			res.redirect(302, redirectionLocation.pathname + redirectionLocation.search);
		} else if (renderProps) {
			const store = initStore();

			const customerTokenStr = req.cookies['customer_token'];

			let customerToken = null;
			if(customerTokenStr) {
				customerToken = JSON.parse(customerTokenStr).value;
			}

			const preNeeds = getPreNeeds(store, renderProps, customerToken);
			const needs = getNeeds(store, renderProps, customerToken);
			if (preNeeds.length > 0) {
				Promise.all(preNeeds)
				.then(() => Promise.all(needs))
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