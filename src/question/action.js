

export const create = (data) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + 'qna/create',
			data: data,
			type: 'POST'
		}).done((json)=>{
			dispatch({
				type: 'CREATE_SUCCESS',
				id: json._id
			});
		}).fail((err)=>{
			dispatch({
				type: 'CREATE_FAIL',
				error: error
			});
		})
	}
}