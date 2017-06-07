import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/header.scss';
import Search from './Search';
import UserBar from './UserBar';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }
    render() {
        return <div className={s.root}>
            <div className="container">
                <div className={s.menu}>
                    <Link to="/" className={s.logoLink}>
                        <img src="/public/img/logo.svg" />
                    </Link>
                    <ul className={s.menuList}>
                        <li>
                            <Link to="/tagged/javascript">Javascript</Link>
                        </li>
                        <li>
                            <Link to="/tagged/php">PHP</Link>
                        </li>
                        <li>
                            <Link to="/tagged/css">CSS</Link>
                        </li>
                    </ul>
                </div>

                <Search />
                <UserBar 
                getNotice={this.props.getNotice} 
                markNoticeRead={this.props.markNoticeRead} 
                logout={this.props.logout} 
                user={this.props.user} 
                notice={this.props.notice} 
                loginWithToken={this.props.loginWithToken} 
                fetchInfo={this.props.fetchInfo} />
            </div>
        </div>
    }
}

export default withStyles(s)(Header);