import {browserHistory} from 'react-router';

export const create = (data) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + 'qna/create',
			data: data,
			type: 'PUT'
		}).done((json)=>{
			browserHistory.push('/questions/'+json.id+'/'+json.url);
		}).fail((err)=>{
			dispatch({
				type: 'CREATE_FAIL',
				error: err
			});
		})
	}
}
export const update = (data) => {
	return dispatch => {
		$.ajax({
			url: `${config.API_URL}qna/questions/${data.id}`,
			data: data,
			type: 'POST'
		}).done((json)=>{
			dispatch({
				type: 'UPDATE_SUCCESS',
				data: {
					...data,
					...json
				}
			});
		}).fail((err)=>{
			dispatch({
				type: 'UPDATE_FAIL',
				error: err
			});
		})
	}
}
export const answer = (question_id, content) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + `qna/questions/${question_id}/answer`,
			data: {
				content: content
			},
			type: 'PUT'
		}).done((json)=>{
			// dispatch(getDetail(question_id));
			dispatch({
				type: 'ANSWER_SUCCESS',
				answer: json
			});
		}).fail((err)=>{
			dispatch({
				type: 'ANSWER_FAIL',
				error: err
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
			url: config.API_URL + 'qna/questions/' + id,
			type: 'GET'
		}).done((json)=>{
			dispatch({
				type: 'GET_DETAIL_SUCCESS',
				data: json
			});
		}).fail((err)=>{
			console.log('er');

			dispatch(browserHistory.replace('404'));

			// dispatch({
			// 	type: 'GET_DETAIL_FAIL',
			// 	error: err
			// });
		})
	}
}

export const vote = (question_id, value) => {
	return dispatch => {
		$.ajax({
			url: config.API_URL + `qna/questions/${question_id}/vote`,
			data: {
				vote: value
			},
			type: 'POST'
		}).done((json)=>{
			dispatch({
				type: 'VOTE_SUCCESS',
				vote: json.vote,
				id: question_id
			});
		}).fail((err)=>{
			dispatch({
				type: 'VOTE_FAIL'
			});
		})
	}
}

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
			type: 'SEARCH_GET_LIST_SUCCESS'
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
				type: 'SEARCH_GET_LIST_SUCCESS'
			})
		})
		.fail((err)=>{
			dispatch({
				type: 'SEARCH_GET_LIST_FAIL',
				error: err
			});
		});
   	}
}
export const setCurentTab = (q = '', query, page = 1) => {
	return dispatch => {
		dispatch(getTabList(q, query, page));
		dispatch({
			q, 
			query,
			type: 'SEARCH_SET_CURRENT_TAB'
		});
	}
}