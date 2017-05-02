import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import App from './../app';
import Home from './../home';

const basePath = typeof _basePath !== 'undefined' ? _basePath : '/';

const Routes = 
    <Route path={basePath} component={App}>
        <IndexRoute component={Home} ></IndexRoute>
    </Route>;

export default Routes;