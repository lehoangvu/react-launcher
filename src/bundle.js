import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WithStylesContex from './global/WithStylesContext';
import store from './store';
import Routes from './routes';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import jQuery from 'jquery';
import config from './config';

window.config = config;
window.$ = jQuery;

render(
    <WithStylesContex onInsertCss={styles => Array.isArray(styles) ? styles.map((style)=>{style._insertCss()}): styles._insertCss()}>
        <Provider store={store}>
            <Router history={browserHistory}>
            {Routes}
            </Router>
        </Provider>
    </WithStylesContex>,
    document.getElementById('root')
);
