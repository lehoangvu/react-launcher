export const fetch = (nickname) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + `account/${nickname}`,
		}).done((info)=>{
			dispatch({
				info,
				type: 'FETCH_ACCOUNT_SUCCESS'
			})
		})
		.fail((err)=>{
			dispatch({
				type: 'FETCH_ACCOUNT_FAIL',
				error: err
			});
		});
	}
}