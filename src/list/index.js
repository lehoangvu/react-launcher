import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _List from './components/List';

const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({

    }, dispatch)
});

const List = connect(mapStateToProps, mapDispatchToProps)(_List);
export default List;
