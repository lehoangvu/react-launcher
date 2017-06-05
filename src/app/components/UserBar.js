import React from 'react';
import { Link } from 'react-router';
import GoogleLoginBtn from './GoogleLoginBtn';
import FacebookLoginBtn from './FacebookLoginBtn';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/user-bar.scss';
import moment from 'moment';

import { Skeleton, UserBox } from './../../global';

class UserBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSigninPopup: false,
            showUserMenu: false,
            loadNotice: false,
            // user: props.user,
            isLogin: props.user !== null
        };
    }

    componentDidMount() {
        if (localStorage) {
            var tokenData = localStorage.getItem('customer_token');
            this.props.fetchInfo(JSON.parse(tokenData));
        }
        window.showSigninPopup = () => {this.showLogin(true)};
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let state = {
            ...this.state,
            isLogin: nextProps.user !== null && nextProps.user !== false
        };
        this.setState(state);
    }

    responseGoogleLogin(info) {
        this.props.loginWithToken(info.access_token, 'google');
    }
    responseFacebookLogin(info) {
        this.props.loginWithToken(info.accessToken, 'facebook');
    }

    getLoginTooltip() {
        if (this.state.showSigninPopup)
            return (
            <div className={s.popup}>
                <div className={s.popupBackDrop} onClick={()=>{this.showLogin(false)}}>
                </div>
                <div className={s.popup}>
                    <div className={s.signinTitle}>Đăng nhập</div>
                    <div className={s.signinNote}>Hiện tại bạn chỉ có thể đăng nhập thông qua tài khoản Google hoặc Facebook.</div>
                    <GoogleLoginBtn onClick={this.loginTolltipToggle.bind(this)} socialId="60036624360-59ceaveq0votucv9inc7fvn2u70c6cg8.apps.googleusercontent.com"
                        scope="profile email openid"
                        responseHandler={this.responseGoogleLogin.bind(this)} >
                    </GoogleLoginBtn>
                    <FacebookLoginBtn onClick={this.loginTolltipToggle.bind(this)}
                        appId="580525262157720"
                        // autoLoad={true}
                        fields="name,email,picture"
                        callback={this.responseFacebookLogin.bind(this)}
                        cssClass="my-facebook-button-class"
                        redirectUri="http://localhost:5000"
                        icon="fa-facebook">
                    </FacebookLoginBtn>
                </div>
            </div>);
    }

    showLogin(show) {
        this.setState({
            showSigninPopup: show
        })
    }

    loginTolltipToggle() {
        this.setState({
            showSigninPopup: !this.state.showSigninPopup
        })
    }
    menuToggle() {
        const show = !this.state.showUserMenu;
        if(show && !this.state.loadNotice) {
            this.props.getNotice(1);
            this.setState({
                loadNotice: true
            });
        }
        this.setState({
            showUserMenu: show
        })
    }
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }
    // <div className={s.noticeItem}>
    //     <b>Hoàng Vũ</b> đã trả lời tại <a href="">Bla bla bla</a>
    //     <span className={s.noticeTime}>2 phút trước</span>
    // </div>
    // <div className={s.noticeItem}>
    //     <b>Hoàng Vũ</b> đã trả lời tại <a href="">Bla bla bla</a>
    //     <span className={s.noticeTime}>2 phút trước</span>
    // </div>
    // <div className={s.noticeItem}>
    //     <b>Hoàng Vũ</b> đã trả lời tại <a href="">Bla bla bla</a>
    //     <span className={s.noticeTime}>2 phút trước</span>
    // </div>
    // <div className={s.noticeItemUnread}>
    //     <div className={s.noticeItem}>
    //         <b>Hoàng Vũ</b> đã trả lời tại <a href="">Bla bla bla</a>
    //         <span className={s.noticeTime}>2 phút trước</span>
    //     </div>
    // </div>
    renderNotice() {
        moment.locale('vi');
        const notice = this.props.notice;
        let noticeHtml = [];
        if(!notice) {
            noticeHtml = [1, 2, 3].map(()=>{
                return <Skeleton w="100%" h="30px" mb="5px" mt="5px" />
            });
        } else {
            noticeHtml = notice.data.map((item)=>{
                let dateString = moment.unix(Math.round(item.create_at / 1000)).format("YYYYMMDD");
                let create_at = moment(dateString, 'YYYYMMDD').fromNow();
                return <div className={!item.readed ? s.noticeItemUnread : null}>
                        <div className={s.noticeItem}>
                            <b>{item.user.fullname}</b> đã {item.action} tại <a href={item.target_url}>{item.target_title}</a>
                            <span className={s.noticeTime}>{create_at}</span>
                        </div>
                    </div>;
            });
        }
        return (
            <div className={s.noticeList} >
                <div className={s.noticeListView}>
                    {noticeHtml}
                </div>
            </div>
        );
    }
    getMenu() {
        if (this.state.showUserMenu) {
            return <div className={s.userMenuContent}>
                <a href="javascript:" onClick={this.logout.bind(this)}>Thoát tài khoản: {this.props.user.fullname}</a>
                {this.renderNotice()}
            </div>;
        }
    }
    render() {
        if (this.props.user === false) {
            return <div className={s.root}>
                <Skeleton w="75px" h="26px" fl="right" />
            </div>
        }
        if (this.state.isLogin) {
            let user = this.props.user;
            return <div className={s.root}>
                <Link className={s.noticeLink} to="notice" title="Thông báo của bạn"><i className="ion-android-notifications" />{user.notice > 0 ? <span className={s.noticeSpan}>{user.notice}</span> : ''}</Link>
                <Link to="/me" className={s.userLink}>
                    <img src={user.image} />
                </Link>
                <div className={s.userMenu}>
                    <button onClick={this.menuToggle.bind(this)}><i className="ion-navicon" /></button>
                    {this.getMenu()}
                </div>
            </div>;
        }
        else
            return <div className={s.root}>
                <a title="Đăng nhâp" className={s.showLogin} href="javascript:" onClick={()=>{this.showLogin(true)}}>
                    Đăng nhập với <span className={s.loginGoogleIcon}><i className="ion-social-google-outline" /></span> hoặc <span className={s.loginFacebookIcon}><i className="ion-social-facebook" /></span>
                </a>
                {this.getLoginTooltip()}
            </div>;
    }
}

export default withStyles(s)(UserBar);