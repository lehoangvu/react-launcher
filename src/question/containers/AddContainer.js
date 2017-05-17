import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddQuestion from '../components/AddQuestion';
import { create } from '../action';

const mapStateToProps = (state, ownProps) => {
    return {
        form: state.question.add.form
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
    	create
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
