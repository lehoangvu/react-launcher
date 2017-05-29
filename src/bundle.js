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
import ReactGA from 'react-ga';
import Raven from 'raven';
Raven.config('https://ad18788eef8f4f2c923b8ecd5edfe050@sentry.io/173012').install();

ReactGA.initialize('UA-71598875-1');
let logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}


window.config = config;
window.Helper = helper;
window.$ = jQuery;

const history = syncHistoryWithStore(browserHistory, store);


render(
    <WithStylesContex onInsertCss={styles => Array.isArray(styles) ? styles.map((style)=>{style._insertCss()}): styles._insertCss()}>
        <Provider store={store}>
            <Router history={history} onUpdate={logPageView}>
            {Routes}
            </Router>
        </Provider>
    </WithStylesContex>,
    document.getElementById('root')
);
