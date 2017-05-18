import React from 'react';
import { Route } from 'react-router';

import {
	AddContainer,
	DetailContainer
} from 'question/containers';

// const params = {
//     id: string({}),
//     slug: string({})
// };

export default (
	<Route>
		<Route path="question/add" component={AddContainer} />
		<Route path="questions/:id/:slug" component={DetailContainer} />
	</Route>
);