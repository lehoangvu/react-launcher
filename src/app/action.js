export const loginWithToken = (token, type) => {
    let API_LOGIN = false;
    if(type === 'google') {
        API_LOGIN = 'auth/login-google'
    }
    if(type === 'facebook') {
        API_LOGIN = 'auth/login-facebook'
    }
    if(API_LOGIN)
        return dispatch => {
            $.ajax({
                url: config.API_URL + API_LOGIN,
                data: {
                    token: token
                },
                type: 'POST'
            }).done(function(response) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    user: response.me,
                    token: response.token
                });
            }).fail(function(error) {

            });
        };
}

export const fetchInfo = (token) => {
    if(token && token.expire > new Date().getTime()) {
        return dispatch => {
            $.ajax({
                url: config.API_URL + 'customer/me',
                data: {
                    token: token.value
                },
                async: false,
                type: 'POST'
            }).done(function(response) {
                dispatch({
                    type: 'FETCH_SUCCESS',
                    token: token,
                    user: response
                });
            }).fail(function(error) {
                dispatch({
                    type: 'FETCH_SUCCESS',
                    user: null
                });
            });
        };
    } else {
        return {
            type: 'FETCH_SUCCESS',
            user: null
        };
    }
}

export const getNotice = (page) => {
    return dispatch => {
        $.ajax({
            url: config.API_URL + 'customer/me/notice',
            data: {
                page: page
            },
            type: 'GET'
        }).done(function(response) {
            dispatch({
                type: 'GET_NOTICE_SUCCESS',
                notice: response
            });
        }).fail(function(error) {
            dispatch({
                type: 'GET_NOTICE_FAIL'
            });
        });
    };
}
export const markNoticeRead = (id) => {
    return dispatch => {
        $.ajax({
            url: config.API_URL + 'customer/me/notice/read',
            data: {
                notice_id: id
            },
            type: 'POST'
        }).done(function(response) {
            dispatch({
                type: 'MARK_NOTICE_READ_SUCCESS',
                notice_id: id
            });
        }).fail(function(error) {
            dispatch({
                type: 'MARK_NOTICE_READ_FAIL'
            });
        });
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
}
