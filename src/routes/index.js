import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './../app';
import NotFound from './../app/containers/NotFoundContainer';
import Home from './../home';
import Question from './../question';
import Account from './../account';

const basePath = typeof _basePath !== 'undefined' ? _basePath : '/';


const Routes = 
    <Route path={basePath} component={App}>
        <IndexRoute component={Home} ></IndexRoute>
        {Question}
        {Account}
        <Route path="404" component={NotFound} />
        <Route path="*" component={NotFound} />
    </Route>;

export default Routes;