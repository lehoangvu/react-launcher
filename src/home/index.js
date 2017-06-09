import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTabList, setCurentTab, getHomeSidebarNewest } from './action';
import _Home from './components/Home';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.home,
        query: ownProps.location.query
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
		getTabList,
		setCurentTab,
		getHomeSidebarNewest
    }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
export default Home;
