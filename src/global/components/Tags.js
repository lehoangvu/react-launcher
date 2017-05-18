import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/snippet.scss';

class Tags extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={s.tags}> 
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(s)(Tags);