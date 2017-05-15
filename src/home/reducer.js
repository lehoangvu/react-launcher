const intinalState = {
    list: [],
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
