
const intinalState = {
    info: false
};

export default (state = intinalState, action) => {
    switch(action.type){
        case 'FETCH_ACCOUNT_SUCCESS':
            return {
                ...state,
                info: action.info
            };
            break;
        default:
            return state;
    }
}
