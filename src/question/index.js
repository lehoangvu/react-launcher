import React from 'react';
import { Route } from 'react-router';

import {
	AddContainer
} from 'question/containers';

const params = {
    id: string({}),
    slug: string({})
};

export default (
	<Route params={params}>
		<Route path="question/add" component={AddContainer} />
		<Route path="question/:id/:slug" component={AddContainer} />
	</Route>
);