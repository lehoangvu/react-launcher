import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import App from './../app';
import List from './../list';

const basePath = typeof _basePath !== 'undefined' ? _basePath : '/';

const Routes = 
    <Route path={basePath} component={App}>
        <IndexRoute component={List} ></IndexRoute>
    </Route>
;

export default Routes;