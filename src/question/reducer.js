
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
	detail: false,
    search: {
        list: {
            data: [],
            loading: true,
            total: 0,
            limit: 20,
            current: 1
        },
        q: '',
        tabs: [{
            title: 'Mới nhất',
            query: 'newest',
            current: true
        }, {
            title: 'Hữu ích',
            query: 'useful',
            current: false
        }, {
            title: 'Phản hồi',
            query: 'feedback',
            current: false
        }],
    },
    time: new Date().getTime()
};

export default (state = intinalState, action) => {
    switch(action.type){
        case 'VOTE_SUCCESS':
            let appendVote = {};
            if(action.id === state.detail.id) {
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
            } else {
                return {
                    ...state,
                    detail: {
                        ...state.detail,
                        answers: {
                            ...state.detail.answers,
                            data: state.detail.answers.data.map((ans) => {
                                if(ans.id === action.id) {
                                    ans.voted = action.vote === 1;
                                    ans.down_voted = action.vote !== 1;
                                    ans.vote = ans.vote + action.vote;
                                }
                                return ans;
                            })
                        }
                    }                
                };
            }
            break;
        case 'VOTE_FAIL':
            return {
                ...state,
                // detail: {
                //     ...state.detail,
                //     time: new Date().getTime()
                // }
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
    	case 'UPDATE_SUCCESS': 
            if(action.data.type === 'question') {
                return {
                    ...state,
                    detail: {
                        ...state.detail,
                        ...action.data
                    }
                }
            } else {
                return {
                    ...state,
                    detail: {
                        ...state.detail,
                        answers: {
                            ...state.detail.answers,
                            data: state.detail.answers.data.map((ans) => {
                                if(ans.id === action.data.id) {
                                    return {
                                        ...ans,
                                        ...action.data
                                    }
                                }
                                return ans;
                            })
                            
                        }
                    }
                };
            }
			return state;
    	case 'UPDATE_FAIL': 
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
            case 'SEARCH_GET_LIST_SUCCESS':
            return {
                ...state,
                search: {
                    ...state.search,
                    list: {
                        ...state.search.list,
                        ...action.data
                    }
                }
            }
            break;
        case 'SEARCH_SET_CURRENT_TAB':
            if(['newest', 'useful', 'feedback'].indexOf(action.query) !== -1) {
                return {
                    ...state,
                    search: {
                        ...state.search,
                        q: action.q,
                        tabs: state.search.tabs.map((item, index) => {
                            if(item.query === action.query) {
                                return {
                                    ...item,
                                    current: true
                                }
                            }
                            return {
                                    ...item,
                                    current: false
                                };
                        })
                    }
                }
            }
            return state;
            break;
        default:
            return state;
    }
}
