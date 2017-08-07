import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/timso.scss';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getRows() {
        const { board } = this.props;
        return board.map((row)=>{
            return this.getCols(row)
        })        
    }

    getColor(index) {
        return ['#F44336',
                '#FFC107',
                '#9C27B0',
                '#607D8B',
                '#2196F3',
                '#E91E63',
                '#009688',
                '#795548'][index];
    }

    getCols(row) {
        const { tick, roomInfo, userId } = this.props;
        let user = {};
        let aliases = [];
        roomInfo.clients.map((client, _index) => {
            aliases.push(client.alias);
            if(client.userId === userId) {
                user = client;
            }
        });
        return row.map((node)=>{
            let cover = '';
            let clientIndex = aliases.indexOf(node.value);
            if(clientIndex !== -1) 
                cover = <i className={s.nodeCover} style={{background: this.getColor(clientIndex)}}>
                            <i className="ion-ios-close-empty" />
                        </i>;
            return <span onClick={() => {tick(node);}} className={s.node}>{node.number}
                        {cover}
                    </span>;
        })
    }
    getSummary() {
        const { gameStatus, roomInfo } = this.props;
        let winner = roomInfo.clients[0];
        roomInfo.clients.map((client)=>{
            if(roomInfo.score[client.userId] > roomInfo.score[winner.userId]) winner = client;
        });

        if(gameStatus == 'ended') {
            return <div className={s.stampWiner}>
                KẾT THÚC
                <br/>
                WINNER: {winner.userName}
            </div>;
        }
    }
    render() {
        const { board } = this.props;
        return <div className={s.boardDrawer}>  
            {this.getSummary()}

            {this.getRows()}
        </div>;
	}
}

export default withStyles(s)(Board);
