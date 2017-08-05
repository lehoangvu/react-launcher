import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/timso.scss';
import { Link } from 'react-router';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: props.roomId,
            userId: '',
            userName: ''
        }
	}

    componentDidMount() {        
        const {socket, roomId} = this.props;
        if(roomId === '') {
            socket.on('createRoomSuccess', ({userId, roomId}) => {
                this.setState({userId, roomId});
            });
            socket.emit('createRoom');
        } else {
            socket.on('createUserIdSuccess', ({userId, roomId}) => {
                this.setState({userId});
            });
            socket.emit('createUserId');
        }
    }

    inputChange(e) {
        this.setState({
            userName: e.currentTarget.value
        });
    }

    joinRoom() {
        const {setRoomId, socket} = this.props;
        const {roomId, userId, userName} = this.state;
        socket.on('regSuccess', () => {
            setRoomId({
                roomId, userId, userName
            });
        });
        socket.emit('reg', {
            userId,
            roomId,
            userName
        });
    }

	render() {
        const {roomId} = this.state;
        if(roomId === '')
		  return <div className="{s.createRoot}">
		      Đang tạo phòng...	
		  </div>
        else 
            return <div className="{s.createRoot}">
                <input value={this.state.userName} onChange={this.inputChange.bind(this)} />
              Xong, click để vào phòng >>> <button onClick={this.joinRoom.bind(this)}>{roomId}</button>
          </div>
	}
}

export default withStyles(s)(CreateRoom);
