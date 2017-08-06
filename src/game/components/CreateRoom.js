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
        socket.on('createUserIdSuccess', ({userId, roomId}) => {
            this.setState({userId});
        });
        socket.on('createRoomSuccess', ({userId, roomId}) => {
            this.setState({userId, roomId});
        });
        socket.on('checkRoomFail', () => {
            alert('Phòng này không tồn tại. Tạo lại phòng mới đê!');
            window.location = `${config.BASE_URL}/g/tim-so`;
        });
        if(roomId === '') {
            socket.emit('createRoom');
        } else {
            socket.emit('checkRoom', {roomId});
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
		  return <div className="container">
                Đang tạo phòng...	
            </div>;
        else 
            return <div className="container text-center">
                <input className={s.nameInp} placeholder="Nhập tên của bạn..." value={this.state.userName} onChange={this.inputChange.bind(this)} />
                <br/>
                <button className={s.starBtn} onClick={this.joinRoom.bind(this)}>
                    Vào phòng
                </button>
          </div>
	}
}

export default withStyles(s)(CreateRoom);
