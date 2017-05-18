import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/snippet.scss';

class VoteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    renderButton() {
        if(this.state.show) {
            return <div>
                    <span className="ion-thumbsdown"></span>  
                    <span className="ion-thumbsup"></span>  
                </div>;
        }
    }

    render() {
        return (
            <div className={s.voteBtn} > 
                <span>0</span>
                <span>votes</span>
                {this.renderButton()}
            </div>
        );
    }
}

export default withStyles(s)(VoteButton);