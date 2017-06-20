import axios from 'axios';

export const getDefail = (token, renderProps) => {
	return {
		type: 'GET_DETAIL_SUCCESS',
		promise: axios.get(config.API_URL + 'qna/questions/' + renderProps.params.id)
	};
}