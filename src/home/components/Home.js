import React from 'react';

import Tabs from './Tabs';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

    _onChange() {

    }

	render() {
		return <div className="root">
            <div className="container">
                <Tabs />
            </div>
		</div>
	}
}