import React from 'react';
import Header from './components/Header';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/app.scss';

class App extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return <div className={s.rootApp}>
        	<Header/>
        	{this.props.children}
        	
		</div>;
	}
}

export default withStyles(s)(App);