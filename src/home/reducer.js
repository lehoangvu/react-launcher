const intinalState = {
    sidebar: {
        newest: false
    },
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
    }]
}

export default (state = intinalState, action) => {
    switch(action.type){
        case 'GET_SIDEBAR_NEWEST_SUCCESS':
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    newest: action.data
                }
            }
            break;
        case 'GET_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data,
                    loading: action.data.loading || false
                }
            }
            break;
        case 'SET_CURRENT_TAB':
            if(['newest', 'useful', 'feedback'].indexOf(action.query) !== -1) {
                return {
                    ...state,
                    q: action.q,
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
