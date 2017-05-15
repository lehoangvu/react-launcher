import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WithStylesContex from './global/WithStylesContext';
import store from './store';
import Routes from './routes';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import jQuery from 'jquery';
import config from './config';
import helper from './global/helper';
import { syncHistoryWithStore } from 'react-router-redux';

window.config = config;
window.Helper = helper;
window.$ = jQuery;

const history = syncHistoryWithStore(browserHistory, store);

render(
    <WithStylesContex onInsertCss={styles => Array.isArray(styles) ? styles.map((style)=>{style._insertCss()}): styles._insertCss()}>
        <Provider store={store}>
            <Router history={history}>
            {Routes}
            </Router>
        </Provider>
    </WithStylesContex>,
    document.getElementById('root')
);
