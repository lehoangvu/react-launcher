import React from 'react';

import Tabs from './Tabs';
import Sidebar from './Sidebar';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

    _onChange() {

    }

	render() {
		return <div className="root">
            <div className="container">
                <Tabs list={this.props.tabs} getTabList={this.props.actions.getTabList} />
                <Sidebar />
            </div>
		</div>
	}
}