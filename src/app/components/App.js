import React from 'react';
import Header from './Header';
import Helmet from "react-helmet";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/app.scss';

import { fetchInfo } from './../server-action';

const ignoreHeader = [
    '/g/tim-so/'
];

class App extends React.Component{
    // static preNeeds = [fetchInfo];

	constructor(props) {
		super(props);
        console.log(props);
    }

    componentDidMount() {
        
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    helmetRender() {
        return <Helmet 
            title={config.SEO_DEFAULT_TITLE}
            meta={[
                {name: 'description', content: config.SEO_DEFAULT_DESCRIPTION}
            ]} />
    }

    renderHeader() {
        if(!(new RegExp('g/tim-so')).test(window.location.href)) {
            return <Header 
                user={this.props.user} 
                notice={this.props.notice} 
                logout={this.props.actions.logout} 
                loginWithToken={this.props.actions.loginWithToken} 
                getNotice={this.props.actions.getNotice} 
                markNoticeRead={this.props.actions.markNoticeRead} 
                fetchInfo={this.props.actions.fetchInfo} />;
        }
    }

	render() {
		return <div className={s.rootApp}>
			{this.helmetRender()}
            {this.renderHeader()}
            <div className={s.mainContent}>
               {this.props.children}
            </div>
		</div>;
	}
}

export default withStyles(s)(App);