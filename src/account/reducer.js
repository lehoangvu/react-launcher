
const intinalState = {
    info: false
};

export default (state = intinalState, action) => {
    switch(action.type){
        case 'FETCH_ACCOUNT_SUCCESS':
            console.log('fetch success acount');
            return {
                ...state,
                info: action.info
            };
            break;
        default:
            return state;
    }
}
