
const intinalState = {
    add: {
    	form: {
    		data: {
		        title: '',
		        content: '## markdown me ^_^ ',
		        tags: ''
    		},
    		error: []
    	} 
    },
	detail: false
};

export default (state = intinalState, action) => {
    switch(action.type){
        case 'VOTE_SUCCESS':
            let appendVote = {};
            if(action.vote === 1) {
                appendVote['voted'] = true;
                appendVote['down_voted'] = false;
                appendVote['vote'] = state.detail.vote +1;
            } else {
                appendVote['voted'] = false;
                appendVote['down_voted'] = true;
                appendVote['down_vote'] = state.detail.down_vote + 1;
            }
            return {
                ...state,
                detail: {
                    ...state.detail,
                    ...appendVote 
                }
            };
            break;
        case 'CREATE_SUCCESS':
            return state;
            break;
    	case 'ANSWER_SUCCESS':
			return {
                ...state,
                detail: {
                    ...state.detail,
                    answers: {
                        ...state.detail.answers,
                        ...state.detail.answers.data.push(action.answer)
                    }
                }
            };
    		break;
    	case 'CREATE_FAIL': 
			return state;
    	case 'GET_DETAIL_SUCCESS': 
			return {
				...state,
				detail: action.data
			};
    		break;
    	case 'GET_DETAIL_FAIL': 
			return state;

    		break;
        default:
            return state;
    }
}
