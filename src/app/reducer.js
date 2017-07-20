import Cookies from 'js-cookie';

const intinalState = {
    user: false,
    notice: false
}
const saveToken = (token) => {
    if(typeof process.env.CLIENT !== 'undefined') {
        $.ajaxSetup({
            headers: { 'x-customer-token': token.value }
        });
        Cookies.set('customer_token', JSON.stringify(token));
    }
    // if(localStorage) {
    //     localStorage.setItem('customer_token', JSON.stringify(token));
    // }
}

export default (state = intinalState, action) => {
    switch(action.type){
        case 'MARK_NOTICE_READ_SUCCESS':
            return {
                ...state,
                notice: {
                    ...state.notice,
                    data: state.notice.data.map((item) => {
                        if(item._id === action.notice_id) {
                            item.readed = true;
                        }
                        return item;
                    })
                }
            };
        break;
        case 'MARK_NOTICE_READ_FAIL':

        break;
        case 'LOGIN_SUCCESS':
            saveToken(action.token);
            return {
                ...state,
                fetched: true,
                user: action.user
            };
            break;
        case 'FETCH_SUCCESS':
            if(action.user !== null){
                saveToken(action.token);
            }
            return {
                ...state,
                fetched: true,
                user: action.user
            };
            break;
        case 'GET_NOTICE_SUCCESS':
            if(!state.notice) {
                return {
                    ...state,
                    notice: {
                        ...action.notice
                    }
                };
            } else {
                return {
                    ...state,
                    notice: {
                        ...state.notice,
                        data: state.notice.data.concat(action.notice.data)
                    }
                };
            }
            break;

        case 'LOGOUT':
            $.ajaxSetup({
                headers: {}
            });
            Cookies.remove('customer_token');
            return {
                ...state,
                fetched: true,
                user: null,
                notice: false
            };
            break;

        default:
            return state;
    }
}
