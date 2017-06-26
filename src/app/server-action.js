
export const fetchInfo = (token, renderProps) => {
    return {
        type: 'FETCH_SUCCESS',
        data_field_name: 'user',
        promise: Helper.fetch('customer/me', 'post', null, {token: token})
    }
}
