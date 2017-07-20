import React from 'react';

import { Tabs } from './../../global';
import CacheComponent from './../../global/libraries/CacheComponent';
import Sidebar from './Sidebar';
import {getTabList, getHomeSidebarNewest} from './../server-action';
export default class Home extends React.Component {
	static preNeeds = [getTabList, getHomeSidebarNewest];

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(!this.props.sidebar.newest)
			this.props.actions.getHomeSidebarNewest();
	}

    handleTab() {
    	const query = this.props.query;
    	const tab = typeof query.tab !== 'undefined' ? query.tab : 'newest';
    	const page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
    	return <Tabs
			base_url="/"
			q=""
			tab={tab}
			page={page}
			tabs={this.props.tabs}
			list={this.props.list}
			getTabList={this.props.actions.getTabList}
			setCurentTab={this.props.actions.setCurentTab} />;
    }

	render() {
    	const query = this.props.query;
    	const tab = typeof query.tab !== 'undefined' ? query.tab : 'newest';
    	const page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;

		return <div className="root">
            <div className="container">
                {this.handleTab()}
            	<Sidebar data={this.props.sidebar} />
	            
            </div>
		</div>
	}
}