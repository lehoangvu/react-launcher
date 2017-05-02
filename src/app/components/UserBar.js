import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn';
import FacebookLoginBtn from './FacebookLoginBtn';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/user-bar.scss';
class UserBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
    }

    responseGoogleLogin (googleUser) {
    }

    render() {
        if(this.state.login)
            return <div className={s.root}>
                <a title="Thông báo của bạn"><i className="ion-android-notifications" /></a>
                <a className={s.userLink}>
                    <img src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-1/p160x160/13133137_591803640983589_2734827762470319016_n.jpg?oh=33c601c38942425ca91d0972fb1c3c09&oe=59BFD39A" />
                </a>
            </div>;
        else
            return <div className={s.root}>
                <a title="Đăng nhâp" className={s.showLogin} href="javascript:">
                    Đăng nhập với <span className={s.loginGoogleIcon}><i className="ion-social-google-outline" /></span> hoặc <span className={s.loginFacebookIcon}><i className="ion-social-facebook" /></span>
                </a>
                <div className={s.popup}>
                    <GoogleLoginBtn socialId="60036624360-59ceaveq0votucv9inc7fvn2u70c6cg8.apps.googleusercontent.com"
                         scope="profile email openid"
                         responseHandler={this.responseGoogleLogin} >
                    </GoogleLoginBtn>
                    <FacebookLoginBtn socialId="60036624360-59ceaveq0votucv9inc7fvn2u70c6cg8.apps.googleusercontent.com"
                         scope="profile email openid"
                         responseHandler={this.responseGoogleLogin} >
                    </FacebookLoginBtn>
                </div>
            </div>;
    }
}

export default withStyles(s)(UserBar);