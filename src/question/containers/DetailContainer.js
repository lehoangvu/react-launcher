import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailQuestion from '../components/DetailQuestion';
import { getDetail } from '../action';
const mapStateToProps = (state, ownProps) => {
    return {
        detail: state.question.detail
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
    	getDetail,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailQuestion);
