import React from 'react';

import { Tabs } from './../../global';
import Sidebar from './Sidebar';

console.log(Tabs);

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		console.log('constructor');
	}

    _onChange() {

    }

    handleTab() {
    	const query = this.props.query;
    	const tab = typeof query.tab !== 'undefined' ? query.tab : 'newest';
    	const page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
    	return <Tabs
                	tab={tab}
                	page={page}
                	tabs={this.props.tabs}
                	list={this.props.list}
                	getTabList={this.props.actions.getTabList}
                	setCurentTab={this.props.actions.setCurentTab} />;
    }

	render() {

		return <div className="root">
            <div className="container">
                {this.handleTab()}
                <Sidebar />
            </div>
		</div>
	}
}