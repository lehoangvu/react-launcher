import React from 'react';
import { Tabs } from './../../global';

class SearchQuestion extends React.Component {
    constructor(props) {
		super(props);
        console.log(props);
	}

    handleTab() {
    	const query = this.props.query;
    	const tab = typeof query.tab !== 'undefined' ? query.tab : 'newest';
    	const page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
    	let q = typeof query.q !== 'undefined' ? query.q : '';
        q = typeof this.props.params.tag !== 'undefined' ? this.props.params.tag : q;
    	return <Tabs
			base_url="/search"
            navText={`Tìm kiếm: \`${q}\``}
			q={q}
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
            </div>
		</div>
	}
}

export default SearchQuestion;
