import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddForm from '../components/AddForm';

const mapStateToProps = (state, ownProps) => {
    return {
        form: state.question.add
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({

    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
