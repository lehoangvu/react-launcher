import React from 'react';
import Header from './Header';
import Helmet from "react-helmet";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/app.scss';

class App extends React.Component{
	constructor(props) {
		super(props);
	}

    componentDidMount() {
        
    }

    helmetRender() {
        return <Helmet 
            title={config.SEO_DEFAULT_TITLE}
            meta={[
                {name: 'description', content: config.SEO_DEFAULT_DESCRIPTION}
            ]} />
    }

	render() {
		return <div className={s.rootApp}>
			{this.helmetRender()}
        	<Header user={this.props.user} logout={this.props.actions.logout} loginWithToken={this.props.actions.loginWithToken} fetchInfo={this.props.actions.fetchInfo} />
            <div className={s.mainContent}>
        	   {this.props.user !== false && this.props.children}
            </div>
		</div>;
	}
}

export default withStyles(s)(App);