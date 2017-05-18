import React from 'react';
import Header from './Header';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/app.scss';

class App extends React.Component{
	constructor(props) {
		super(props);
	}

    componentDidMount() {
        
    }

	render() {
		return <div className={s.rootApp}>
        	<Header user={this.props.user} logout={this.props.actions.logout} loginWithToken={this.props.actions.loginWithToken} fetchInfo={this.props.actions.fetchInfo} />
            <div className={s.mainContent}>
        	   {this.props.user !== false && this.props.children}
            </div>
		</div>;
	}
}

export default withStyles(s)(App);