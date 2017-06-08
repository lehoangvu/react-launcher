import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailAccount from '../components/DetailAccount';
import { fetch } from '../action';

const mapStateToProps = (state, ownProps) => {
    return {
        info: state.account.info,
        params: ownProps.params
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
    	fetch
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailAccount);
