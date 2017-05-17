import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/facebookLogin.scss';

class FacebookLoginBtn extends React.Component{
  constructor(props) {
	super(props);
	this.state = {
		isSdkLoaded: false,
		isProcessing: false,
	};

  }

	sdkLoaded() {
		this.setState({ isSdkLoaded: true });
	}

	setFbAsyncInit() {
		const { appId, xfbml, cookie, version, autoLoad } = this.props;
		window.fbAsyncInit = () => {
		  window.FB.init({
		    version: `v${version}`,
		    appId,
		    xfbml,
		    cookie,
		  });
		  this.setState({ isSdkLoaded: true });
		  if (autoLoad || window.location.search.includes('facebookdirect')) {
		    window.FB.getLoginStatus(this.checkLoginAfterRefresh.bind(this));
		  }
		};
	}

	checkLoginAfterRefresh (response) {
	    if (response.status === 'connected') {
	      this.checkLoginState(response);
	    } else {
	      window.FB.login(loginResponse => this.checkLoginState(loginResponse), true);
	    }
  	}

  	responseApi(authResponse) {
	    window.FB.api('/me', { locale: this.props.language, fields: this.props.fields }, (me) => {
	      Object.assign(me, authResponse);
	      this.props.callback(me);
	    });
	  };

  	checkLoginState(response) {
	    this.setState({ isProcessing: false });
	    if (response.authResponse) {
	      this.responseApi(response.authResponse);
	    } else {
	      if (this.props.callback) {
	        this.props.callback({ status: response.status });
	      }
	    }
	  };
	loadSdkAsynchronously() {
		const { language } = this.props;
		((d, s, id) => {
		  const element = d.getElementsByTagName(s)[0];
		  const fjs = element;
		  let js = element;
		  if (d.getElementById(id)) { return; }
		  js = d.createElement(s); js.id = id;
		  js.src = `//connect.facebook.net/${language}/all.js`;
		  fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
	}
	componentDidMount () {
		if (document.getElementById('facebook-jssdk')) {
			this.sdkLoaded();
			return;
		}
		this.setFbAsyncInit();
		this.loadSdkAsynchronously();
		let fbRoot = document.getElementById('fb-root');
		if (!fbRoot) {
			fbRoot = document.createElement('div');
			fbRoot.id = 'fb-root';
			document.body.appendChild(fbRoot);
		}
	}

  clickHandler (e) {
  	if (!this.state.isSdkLoaded || this.state.isProcessing || this.props.isDisabled) {
      return;
    }
    this.setState({ isProcessing: true });
    const { scope, appId, onClick, reAuthenticate, redirectUri, disableMobileRedirect } = this.props;

    if (typeof onClick === 'function') {
      onClick(e);
      if (e.defaultPrevented) {
        return;
      }
    }

    const params = {
      client_id: appId,
      redirect_uri: redirectUri,
      state: 'facebookdirect',
      scope,
    };

    if (reAuthenticate) {
      params.auth_type = 'reauthenticate';
    }

    if (this.props.isMobile && !disableMobileRedirect) {
      window.location.href = `//www.facebook.com/dialog/oauth?${objectToParams(params)}`;
    } else {
      window.FB.login(loginResponse => this.checkLoginState(loginResponse), { scope, auth_type: params.auth_type });
    }
  }

  render () {
	return (
		<div onClick={ this.clickHandler.bind(this) } className={s.root}>
			<i className="ion-social-facebook"></i>
			<span>Facebook</span>
		</div>
	)
  }
}

export default withStyles(s)(FacebookLoginBtn);
