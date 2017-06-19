import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchQuestion from '../components/SearchQuestion';
import { getTabList, setCurentTab } from './../action';
const mapStateToProps = (state, ownProps) => {
    return {
        ...state.question.search,
        query: ownProps.location.query
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
		getTabList,
		setCurentTab
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchQuestion);
