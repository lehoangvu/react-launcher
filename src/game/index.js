import React from 'react';
import { Route } from 'react-router';

import {
	TimSoContainer
} from './containers';


export default (
	<Route>
		<Route path="g/tim-so" component={TimSoContainer} />
		<Route path="g/tim-so/:roomId" component={TimSoContainer} />
	</Route>
);