import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from './components/App';

import { loginWithToken, fetchInfo, logout, getNotice } from './action';

const mapStateToProps = (state) => {
	let user = state.app.user;
	if(user) {
		user.notice = state.app.notice;
	}
    return {
        user
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loginWithToken,
        fetchInfo,
        logout,
        getNotice
    }, dispatch)
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
