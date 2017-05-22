import React from 'react';
import { Route } from 'react-router';

import {
	AddContainer,
	SearchContainer,
	DetailContainer
} from 'question/containers';

// const params = {
//     id: string({}),
//     slug: string({})
// };

export default (
	<Route>
		<Route path="search" component={SearchContainer} />
		<Route path="questions/tagged/:tag" component={DetailContainer} />
		<Route path="questions/:id/:slug" component={DetailContainer} />
		
		<Route path="questions/delete" component={AddContainer} />
		<Route path="questions/update" component={AddContainer} />
		<Route path="questions/add" component={AddContainer} />
	</Route>
);