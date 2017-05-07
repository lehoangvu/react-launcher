import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/skeleton.scss';

class Skeleton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let styles = {};
        if(this.props.w)
            styles['width'] = this.props.w;
        if(this.props.h)
            styles['height'] = this.props.h;
        return (
            <div className={s.root} style={styles}>

            </div>
        );
    }
}

export default withStyles(s)(Skeleton);