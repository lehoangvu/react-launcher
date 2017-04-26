import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={s.root}>
            <div className="container">
                <div className={s.menu}>
                    <ul className={s.menuList}>
                        <li>
                            <a href="">Javascript</a>
                        </li>
                        <li>
                            <a href="">PHP</a>
                        </li>
                        <li>
                            <a href="">Html<br/>CSS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    }
}

export default withStyles(s)(Header);