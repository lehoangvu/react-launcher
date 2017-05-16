import React from 'react';
import { Route } from 'react-router';

import {
	AddContainer
} from 'question/containers';

export default (
	<Route>
		<Route path="question/add" component={AddContainer} />
	</Route>
);