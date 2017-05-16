const intinalState = {
    list: {
        data: [],
        loading: true,
        total: 0,
        limit: 20,
        current: 1
    },
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
        case 'GET_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data
                }
            }
            break;
        case 'SET_CURRENT_TAB':
            let {tabs} = state;
            if(['newest', 'useful', 'feedback'].indexOf(action.query) !== -1) {
                return {
                    ...state,
                    tabs: state.tabs.map((item, index) => {
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
            return state;
            break;

        default:
            return state;
    }
}
