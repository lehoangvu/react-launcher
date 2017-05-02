import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _Home from './components/Home';

const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({

    }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
export default Home;
