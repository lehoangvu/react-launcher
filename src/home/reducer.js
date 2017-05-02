const intinalState = {
    list: [],
    tabs: [{
        title: 'Mới nhất',
        query: 'newest'
    }, {
        title: 'Hữu ích',
        query: 'vote|desc'
    }, {
        title: 'Phản hồi',
        query: 'reply|desc'
    }],
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
