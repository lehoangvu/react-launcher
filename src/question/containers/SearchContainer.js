import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchQuestion from '../components/SearchQuestion';
import { getTabList, setCurentTab } from './../action';
import { getHomeSidebarNewest, getGithubTrend } from './../../home/action';
const mapStateToProps = (state, ownProps) => {
    return {
        ...state.question.search,
        query: ownProps.location.query,
        sidebar: state.home.sidebar
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
		getTabList,
		setCurentTab,
        getHomeSidebarNewest,
        getGithubTrend
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchQuestion);
