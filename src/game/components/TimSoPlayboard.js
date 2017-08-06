import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/timso.scss';
import shortid from 'shortid';
import Board from './Board';

class TimSoPlayboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: props.roomId,
            userId: props.userId,
            userName: props.userName,
            agree: false,
            gameStatus: 'playing',
            roomInfo: {
                clients:[],
                board: [],
                score: {}
            }
        }
	}

    getRoomInfo() {
        const {socket} = this.props;
        const {roomId} = this.state;
        socket.emit('fetchRoomInfo', {roomId});
    }

    componentDidMount() {   
        const {socket} = this.props;
        socket.on('fetchRoomInfoSuccess', (roomInfo) => {
            this.setState({roomInfo});
        });     
        socket.on('endGameSignal', (roomInfo) => {
            this.setState({
                gameStatus: 'ended',
                agree: false
            });
        }); 
        socket.on('playAgainSuccess', (roomInfo) => {
            this.setState({
                gameStatus: 'playing',
                agree: true,
                roomInfo
            });
        });    

        socket.on('playSignalSuccess', (roomInfo)=>{
            this.setState({roomInfo});
        });
        socket.on('tickSuccess', (roomInfo)=>{
            this.setState({roomInfo});
        });

        this.getRoomInfo();
    }

    getUserSummary() {        
        let totalScore = 0;
        let users = this.state.roomInfo.clients.map((client)=>{
            let score = this.state.roomInfo.score[client.userId];
            totalScore += score; 
            return <td>
                    <h3>{client.userName}</h3>
                    <br/>
                    Điểm <b styles={{fontSize: '30px'}}>{score}</b>
                </td>;
        });
        return <table>
            <tr>
                <td colSpan={this.state.roomInfo.clients.length}>
                    <div className={s.currentNumber}>
                        Hãy tìm: 
                        <b>{totalScore + 1}</b>
                    </div>
                </td>
            </tr>
            <tr>
                {users}
            </tr>
        </table>;
    }

    emitPlaySignal() {
        const { socket } = this.props;
        const { roomId, userId } = this.state;
        this.setState({
            agree: true
        });
        socket.emit('playSignal', {
            roomId,
            userId
        });
    }

    emitPlayAgainSignal() {
        const { socket } = this.props;
        const { roomId, userId } = this.state;
        socket.emit('playAgain', {
            roomId,
            userId
        });
    }

    getStarBtn() {
        if(this.state.roomInfo.board.length === 0) {
            let disabled = this.state.agree ? 'disabled' : '';
            return <button className={s.starBtn} disabled={disabled} onClick={this.emitPlaySignal.bind(this)}>Bắt đầu chơi</button>;
        } else {
            if(this.state.gameStatus === 'ended') {
                let disabled = this.state.agree ? 'disabled' : '';
                return <button className={s.starBtn} disabled={disabled} onClick={this.emitPlayAgainSignal.bind(this)}>Chơi lại</button>;
            }
        }
    }

    tick(node) {
        const { socket } = this.props;
        const { roomId, userId } = this.state;
        socket.emit('tick', {
            userId,
            roomId,
            node
        });
    }

	render() {
        const {userName, roomId, gameStatus, roomInfo, userId} = this.state;
        return  <table>
                <tr>
                    <td>
                        <h1>Room: <textarea style={{
                            fontWeight: 'normal',
                            border: '1px solid',
                            padding: '0 10px'
                        }}>{`${config.BASE_URL}/g/tim-so/${roomId}`}</textarea></h1>
                        <br/>
                        <h2>{userName}! Chiến nào!</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.getUserSummary()}
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.getStarBtn()}
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board userId={userId} roomInfo={roomInfo} gameStatus={gameStatus} tick={this.tick.bind(this)} board={this.state.roomInfo.board} />
                    </td>
                </tr>
            </table>;
	}
}

export default withStyles(s)(TimSoPlayboard);
