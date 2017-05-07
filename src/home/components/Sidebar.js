import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={s.root}>
            <div className="text-right">
                <a className="btn" href="">Hỏi ngay!</a>
            </div>
            <div className={s.rootDiscussFeed}>
                <h3>Phản hồi mới nhất</h3>
            </div>
        </div>
    }
}

export default  withStyles(s)(Sidebar)