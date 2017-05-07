import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from './components/App';

import { loginWithToken, fetchInfo } from './action';

const mapStateToProps = (state) => {
    return {
        user: state.app.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loginWithToken,
        fetchInfo
    }, dispatch)
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
