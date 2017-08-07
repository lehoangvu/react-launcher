import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimSoView from '../components/TimSoView';
import { setRoomId } from './../action';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.game.timso,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
		setRoomId
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TimSoView);
