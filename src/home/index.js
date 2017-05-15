import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTabList } from './action';
import _Home from './components/Home';

const mapStateToProps = (state) => {
    return {
        ...state.home
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
		getTabList
    }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
export default Home;
