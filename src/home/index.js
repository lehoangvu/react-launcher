import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeWrap from './components/HomeWrap';

const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({

    }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeWrap);
export default Home;
