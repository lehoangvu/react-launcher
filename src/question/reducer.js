import {browserHistory} from 'react-router';
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
    		
    }
};

export default (state = intinalState, action) => {
    switch(action.type){
    	case 'CREATE_SUCCESS': 
			browserHistory.push('/question/'+action.id);
			return state;
    		break;
    	case 'CREATE_FAIL': 
			return state;

    		break;
        default:
            return state;
    }
}
