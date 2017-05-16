export const getTabList = (sort, page = 1) => {
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
				q: '',
				sort: sort,
				page: page
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
export const setCurentTab = (query, page = 1) => {
	return dispatch => {
		dispatch(getTabList(query, page));
		dispatch({
			query,
			type: 'SET_CURRENT_TAB'
		});
	}
}