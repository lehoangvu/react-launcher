import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotFound from '../components/NotFound';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
    }, dispatch)
});

const NotFoundContainer = connect(mapStateToProps, mapDispatchToProps)(NotFound);
export default NotFoundContainer;