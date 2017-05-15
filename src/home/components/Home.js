import React from 'react';

import Tabs from './Tabs';
import Sidebar from './Sidebar';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		console.log('constructor');
	}

    _onChange() {

    }

	render() {

		return <div className="root">
            <div className="container">
                <Tabs
                	query={this.props.query} 
                	tabs={this.props.tabs}
                	list={this.props.list}
                	getTabList={this.props.actions.getTabList}
                	setCurentTab={this.props.actions.setCurentTab} />
                <Sidebar />
            </div>
		</div>
	}
}