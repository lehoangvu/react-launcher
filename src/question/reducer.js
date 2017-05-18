
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
    	case 'CREATE_SUCCESS':
			return state;
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
