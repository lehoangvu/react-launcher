import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/snippet.scss';

export default class UserBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.user;
        return (
            <div className={s.userBox}>
                <Link to={"/user/"+user.nickname}>
                    <img src={user.image} />
                    <span className={s.userBoxMeta}>
                        <span className={s.userBoxName}>{user.fullname}</span>
                    </span>
                </Link>
            </div>
        );
    }
}