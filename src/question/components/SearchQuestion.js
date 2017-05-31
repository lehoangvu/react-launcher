import React from 'react';
import Helmet from "react-helmet";
import { Tabs } from './../../global';

class SearchQuestion extends React.Component {
    constructor(props) {
		super(props);
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


    helmetRender() {
    	const query = this.props.query;
    	let q = typeof query.q !== 'undefined' ? query.q : '';
        q = typeof this.props.params.tag !== 'undefined' ? this.props.params.tag : q;
        return <Helmet 
            title={`Câu hỏi liên quan '${q}'`}
            link={[
                {
					"rel": "canonical", 
					"href": typeof this.props.params.tag !== 'undefined' ? config.BASE_URL + `tagged/${q}` : config.BASE_URL + `search?q=${q}`
				}
            ]} />
    }

	render() {
		return <div className="root">
			{this.helmetRender()}
            <div className="container">
                {this.handleTab()}
            </div>
		</div>
	}
}

export default SearchQuestion;
