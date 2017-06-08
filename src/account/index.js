import React from 'react';
import { Route } from 'react-router';

import {
	AccountContainer
} from './containers';


export default (
	<Route>
		<Route path="user/:nickname" component={AccountContainer} />
	</Route>
);