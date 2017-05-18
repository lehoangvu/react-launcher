

export const create = (data) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + 'qna/create',
			data: data,
			type: 'POST'
		}).done((json)=>{
			dispatch({
				type: 'CREATE_SUCCESS',
				id: json._id,
				url: json.url
			});
		}).fail((err)=>{
			dispatch({
				type: 'CREATE_FAIL',
				error: error
			});
		})
	}
}

export const getDetail = (id) => {
	return dispatch => {
		dispatch({
			type: 'GET_DETAIL_SUCCESS',
			data: false
		});
		$.ajax({
			url: config.API_URL + 'qna/questions',
			data: {
				id: id
			},
			type: 'GET'
		}).done((json)=>{
			dispatch({
				type: 'GET_DETAIL_SUCCESS',
				data: json
			});
		}).fail((err)=>{
			dispatch({
				type: 'GET_DETAIL_FAIL',
				error: error
			});
		})
	}
}