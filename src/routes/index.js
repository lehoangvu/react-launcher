import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './../app';
import Home from './../home';
import Question from './../question';

const basePath = typeof _basePath !== 'undefined' ? _basePath : '/';

const Routes = 
    <Route path={basePath} component={App}>
        <IndexRoute component={Home} ></IndexRoute>
        {Question}
    </Route>;

export default Routes;