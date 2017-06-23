
export const fetchInfo = (token, renderProps) => {
    console.log('__FET');
    return {
        type: 'FETCH_SUCCESS',
        promise: Helper.fetch('customer/me', 'post', null, {token: token})
    }
}
