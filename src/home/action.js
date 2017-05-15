export const getTabList = (sort, page) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + 'qna/search',
			data: {
				q: '',
				sort: sort,
				page: page
			}
		}).done((json)=>{
			console.log(json)
		})
		.fail((error)=>{

		})
   	}
}