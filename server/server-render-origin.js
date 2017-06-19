import path from 'path'
import Express from 'express'
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
global["$"] = _$;

// $.ajax({
// 	url: "http://localhost:5100/api/qna/search"
// }).done((data) => {
// 	console.log(data);
// });


// global["localStorage"] = new NodeLocalstorage.LocalStorage('./scratch');
 
// localStorage.setItem('myFirstKey', 'myFirstValue');
// console.log(localStorage.getItem('myFirstKey'));

const app = Express()
const port = 5000

app.use('/public', Express.static('./public'))
app.use('/dist', Express.static('./dist'))

// This is fired every time the server side receives a request
app.use(handleRender)

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
			// Create a new Redux store instance
			// Render the component to a string
			// console.log(renderProps.components[0].ComposedComponent);return;
			// renderProps.components.map((component) => {
			// 	if(typeof component !== 'undefined')
			// 		console.log(component.ComposedComponent.serverTrigger);
			// });


			// const needs = renderProps.components.reduce((prev, current) => {
			// 	if(current) console.log(current);
			// 	// const result = current ? (current.serverTrigger || []).concat(prev) : prev;
			// 	// return result;
			// }, []);
			// console.log(needs);


			// return;
			
		  	let html = renderHtml(store, renderProps);	
			// Grab the initial state from our Redux store
			const preloadedState = store.getState()

			// Send the rendered page back to the client
			res.send(html);
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


app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('Web Server started at 5000');
	}
});

