import axios from 'axios';

export const getTabList = (token, renderProps) => {
	const query = renderProps.location.query;
	const page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
	const q = typeof query.q !== 'undefined' ? query.q : '';
	const sort = typeof query.tab !== 'undefined' ? query.tab : 'newest';
	return {
		type: 'GET_LIST_SUCCESS',
		promise: axios.get(`${config.API_URL}qna/search?q=${q}&sort=${sort}&page=${page}`)
	}
}

export const getHomeSidebarNewest = (token, renderProps) => {
	return {
		type: 'GET_SIDEBAR_NEWEST_SUCCESS',
		promise: axios.get(config.API_URL + 'qna/newest')
	}
}