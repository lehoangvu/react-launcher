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
        if(this.props.ml)
            styles['marginLeft'] = this.props.ml;
        if(this.props.mr)
            styles['marginRight'] = this.props.mr;
        if(this.props.mb)
            styles['marginBottom'] = this.props.mb;
        if(this.props.mt)
            styles['marginTop'] = this.props.mt;
        if(this.props.fl)
            styles['float'] = this.props.fl;
        return (
            <div className={this.props.wrap ? s.rootWrap : s.root} style={styles}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(s)(Skeleton);