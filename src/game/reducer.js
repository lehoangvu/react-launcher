const intinalState = {
    timso: {
        userId: '',
        roomId: '',
        userName: ''
    }
};

export default (state = intinalState, action) => {
    switch(action.type){
        case 'SET_ROOM_ID': 
        	return {
        		...state,
        		timso: {
        			...state.timso,
        			userId: action.userId,
        			roomId: action.roomId,
        			userName: action.userName
        		}
        	}
        break;
        default:
            return state;
    }
}
