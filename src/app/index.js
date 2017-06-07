import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from './components/App';

import { loginWithToken, fetchInfo, logout, getNotice, markNoticeRead } from './action';

const mapStateToProps = (state) => {
	const { user, notice } = state.app
    return {
        user, 
        notice
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loginWithToken,
        fetchInfo,
        logout,
        getNotice,
        markNoticeRead
    }, dispatch)
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
