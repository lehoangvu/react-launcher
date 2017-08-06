import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/timso.scss';
import CreateRoom from './CreateRoom';
import TimSoPlayboard from './TimSoPlayboard';

import io from 'socket.io-client';

class TimSoView extends React.Component {
    constructor(props) {
        super(props);
        const _socket = io.connect(config.SOCKET_URL);
        this.socket = _socket;
    }
    componentDidMount() {
    }
    render() {
        const { userId, userName } = this.props;
        const roomId = this.props.params.roomId || this.props.roomId || '';
        console.log(roomId);
        const {setRoomId} = this.props.actions;
        if(userName === '') 
            return <CreateRoom
                roomId={roomId}
                setRoomId={setRoomId}
                socket={this.socket} />
		return <div className={s.root}>
			<TimSoPlayboard
                roomId={roomId}
                userId={userId}
                userName={userName}
                socket={this.socket} />
		</div>
	}
}

export default withStyles(s)(TimSoView);
