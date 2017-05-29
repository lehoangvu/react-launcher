import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailQuestion from '../components/DetailQuestion';
import { getDetail, answer, vote, update } from '../action';
const mapStateToProps = (state, ownProps) => {
    return {
        detail: state.question.detail,
        user: state.app.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
    	getDetail,
    	answer,
    	vote, 
        update
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailQuestion);
