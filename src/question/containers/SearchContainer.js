import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchQuestion from '../components/SearchQuestion';
import { getDetail, answer, vote } from '../action';
const mapStateToProps = (state, ownProps) => {
    return {
        list: state.question.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchQuestion);
