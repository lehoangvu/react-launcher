import React from 'react';
import { Link } from 'react-router';
import GoogleLoginBtn from './GoogleLoginBtn';
import FacebookLoginBtn from './FacebookLoginBtn';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/user-bar.scss';
import moment from 'moment';
import Cookies from 'js-cookie';

import { Skeleton, UserBox } from './../../global';
// import { fetchInfo } from './../server-action';

class UserBar extends React.Component {
    
    // static preNeeds = [fetchInfo];

    constructor(props) {
        super(props);
        this.state = {
            showSigninPopup: false,
            showUserMenu: false,
            loadNotice: false,
            loadingNotice: false,
            resetAllNotice: false,
            // user: props.user,
            isLogin: props.user !== null
        };
    }

    componentDidMount() {
        // if (localStorage) {
        //     var tokenData = localStorage.getItem('customer_token');
        // }

        var tokenData = Cookies.get('customer_token');
        if(!this.props.user) {
            if(tokenData) {
                this.props.fetchInfo(JSON.parse(tokenData));
            } else {
                this.props.fetchInfo(JSON.parse('{}'));
            }
        }
        window.showSigninPopup = () => {this.showLogin(true)};
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        let state = {
            isLogin: nextProps.user !== null && nextProps.user !== false
        };
        if(nextProps.notice && this.props.notice && nextProps.notice.data.length > this.props.notice.data.length) {
            state.loadingNotice = false;
        }
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
                    <GoogleLoginBtn onClick={this.loginTolltipToggle.bind(this)}
                        socialId={config.GG_APP_ID}
                        scope="profile email openid"
                        responseHandler={this.responseGoogleLogin.bind(this)} >
                    </GoogleLoginBtn>
                    <FacebookLoginBtn onClick={this.loginTolltipToggle.bind(this)}
                        appId={config.FB_APP_ID}
                        // autoLoad={true}
                        fields="name,email,picture"
                        callback={this.responseFacebookLogin.bind(this)}
                        cssClass="my-facebook-button-class"
                        redirectUri={config.BASE_URL}
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
                loadNotice: true,
                resetAllNotice: true
            });
        }
        this.setState({
            showUserMenu: show
        })
    }
    logout(e) {

        this.setState({
            showSigninPopup: false,
            showUserMenu: false,
            loadNotice: false,
            loadingNotice: false
        });
        e.preventDefault();
        this.props.logout();
    }
    onNoticeScroll(e) {
        const dom = e.target;
        const notice = this.props.notice;
        if( this.state.loadNotice
            && notice.data.length < notice.total
            && !this.state.loadingNotice
            && ((dom.offsetHeight + dom.scrollTop) === dom.scrollHeight)) {
            this.setState({
                loadingNotice: true
            });
            this.props.getNotice(Math.ceil(notice.data.length / notice.limit) + 1);
            e.preventDefault();
        }
    }
    markNoticeRead(id) {
        this.props.markNoticeRead(id);
    }
    renderNotice() {
        moment.locale('vi');
        const notice = this.props.notice;
        let noticeHtml = [];
        if(!notice) {
            noticeHtml = [1, 2, 3].map((item)=>{
                return <Skeleton key={item} w="100%" h="30px" mb="5px" mt="5px" />
            });
        } else {
            noticeHtml = notice.data.map((item, index)=>{
                let dateString = moment.unix(Math.round(item.create_at / 1000)).format("YYYYMMDD");
                let create_at = moment(dateString, 'YYYYMMDD').fromNow();
                return <div key={index} className={!item.readed ? s.noticeItemUnread : null}>
                        <div className={s.noticeItem}>
                            {(!item.readed) && (<span className={s.noticeMarkRead} onClick={(e) => {this.markNoticeRead(item._id)}} />)}
                            <b>{item.user.fullname}</b> đã {item.action} tại <a target='_blank' href={item.target_url}>{item.target_title}</a>
                            <span className={s.noticeTime}>{create_at}</span>
                        </div>
                    </div>;
            });
        }
        return (<div className="small-scroll-bar">
            <div className={s.noticeList} onScroll={this.onNoticeScroll.bind(this)} >
                <div className={s.noticeListView}>
                    {noticeHtml}
                </div>
            </div>
            {(this.state.loadingNotice) && (<div className={s.noticeLoadingText}>Đang tải thêm...</div>)}
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
                <a className={s.noticeLink} href="javascript:" title="Thông báo của bạn"><i className="ion-android-notifications" />{user.notice > 0 && !this.state.resetAllNotice ? <span className={s.noticeSpan}>{user.notice}</span> : ''}</a>
                <Link to={`/user/${user.nickname}`} className={s.userLink}>
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