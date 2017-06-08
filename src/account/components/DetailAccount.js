import React from 'react';
import { UserBox } from './../../global';
import ActivityChart from './ActivityChart';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/detail.scss';
class DetailAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const params = this.props.params;
        let nickname = typeof params.nickname !== 'undefined' ? params.nickname : '';
        this.props.actions.fetch(nickname);
    }

    render() {
        const info = this.props.info;
        const activityData = {
            activity: this.props.info.activity,
            start_time: info.create_at
        };
        if(!info) {
            return <div className={s.root}></div>
        }
        return (
            <div className={s.root}>
                <div className="container">
                    <UserBox type="medium" user={info}/>
                    <ActivityChart data={activityData} />
                </div>
            </div>
        );
    }
}
export default withStyles(s)(DetailAccount);