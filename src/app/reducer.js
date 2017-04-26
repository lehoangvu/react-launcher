const intinalState = {
    
}

export default (state = intinalState, action) => {
    switch(action.type){
        case 'LOAD_SUCCESS':
            return {
                ...state,
                ...action.data
            }
            break;

        default:
            return state;
    }
}
