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
        if(this.props.user && this.props.user.nickname === this.props.owner.nickname) {
            return;
        }
        if(!this.props.user && typeof showSigninPopup !== 'undefined') {
            showSigninPopup();
            return;
        }
        this.setState({
            loading: true
        });
        this.props.onVote(this.props.id, vote);
    }
    componentWillReceiveProps(nextProps) {
        // console.log(this.state);
        this.setState({
            loading: false
        });
    }
    renderButton() {
        let btn1, btn2;
        if (this.props.down_voted) {
            btn1 = <span className="ion-thumbsdown" ></span>;
        } else {
            btn1 = <a onClick={() => { this.handleClick(-1) }} className="ion-thumbsdown" ></a>;
        }
        if (this.props.voted) {
            btn2 = <span className="ion-thumbsup" ></span>;
        } else {
            btn2 = <a onClick={() => { this.handleClick(1) }} className="ion-thumbsup" ></a>;
        }
        return <div className={s.voteBtnAct}>
            {btn1}
            {btn2}
        </div>;
    }
    renderLoading() {
        if (this.state.loading) {
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