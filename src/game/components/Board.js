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
            return <span className={s.nodeRow}>
                {this.getCols(row)}
            </span>;
        })        
    }

    getCols(row) {
        const {tick} = this.props;
        return row.map((node)=>{
            let cover = '';
            if(node.value === 'x'|| node.value === 'o') 
                cover = <i className={s.nodeCover}>
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
