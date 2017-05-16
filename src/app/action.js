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
                type: 'POST'
            }).done(function(response) {
                dispatch({
                    type: 'FETCH_SUCCESS',
                    token: token,
                    user: response
                });
            }).fail(function(error) {
                console.log('faild');
            });
        };
    } else {
        return {
            type: 'FETCH_SUCCESS',
            user: null
        };
    }
}