export const getTabList = (q = '', sort, page = 1) => {
	return dispatch => {
		dispatch({
			data: {
		        data: [],
		        total: 0,
		        limit: 20,
		        current: 1,
		        loading: true
		    },
			type: 'GET_LIST_SUCCESS'
		});
		$.ajax({
			url: config.API_URL + 'qna/search',
			data: {
				q,
				sort,
				page
			}
		}).done((json)=>{
			dispatch({
				data: {
					...json,
		        	loading: false,
					current: page
				},
				type: 'GET_LIST_SUCCESS'
			})
		})
		.fail((error)=>{

		})
   	}
}
export const setCurentTab = (q = '', query, page = 1) => {
	return dispatch => {
		dispatch(getTabList(q, query, page));
		dispatch({
			q, 
			query,
			type: 'SET_CURRENT_TAB'
		});
	}
}