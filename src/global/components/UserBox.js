import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/snippet.scss';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.user;
        if(this.props.type && this.props.type === 'medium')
            return (
                <div className={s.userBoxBig}>
                    <Link to={"/user/"+user.nickname}>
                        <img src={user.image} />
                        <span className={s.userBoxBigMeta}>
                            <span className={s.userBoxBigName}>{user.fullname}</span>
                        </span>
                    </Link>
                </div>
            );


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
export default withStyles(s)(UserBox);