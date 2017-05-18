import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/snippet.scss';

class VoteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    handleClick(vote) {
        this.setState({
            loading: true
        });
    }
    renderButton() {
        let btn1, btn2;
        if(this.props.voted) {
            btn1 = <span className="ion-thumbsdown" ></span>; 
        }else {
            btn1 = <a onClick={()=>{this.handleClick(false)}} className="ion-thumbsdown" ></a>;
        }
        if(this.props.down_voted) {
            btn2 = <span className="ion-thumbsup" ></span>; 
        }else {
            btn2 = <a onClick={()=>{this.handleClick(true)}} className="ion-thumbsup" ></a>;
        }
        return <div className={s.voteBtnAct}>
                {btn1}
                {btn2}
            </div>;
    }
    renderLoading() {
        if(this.state.loading) {
            return <div className="loadingLayer"></div>
        }
    }
    render() {
        return (
            <div className={s.voteBtn} > 
                <span>{parseInt(this.props.vote) - parseInt(this.props.down_vote)}</span>
                <span>votes</span>
                {this.renderButton()}
                {this.renderLoading()}
            </div>
        );
    }
}

export default withStyles(s)(VoteButton);
// login
// voted
// downvoted