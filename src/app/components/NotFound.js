import React from 'react';
import { Link, browserHistory } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/app.scss';
import Helmet from "react-helmet";

class NotFound extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			q: ''
		}
	}

    componentDidMount() {
        
    }

    onSubmitSearch(e) {
        e.preventDefault();
        browserHistory.push(`/search?q=${this.state.q}`)
    }

    handleInputChange(e) {
    	this.setState({
    		q: e.target.value
    	});
    }

    helmetRender() {
        return <Helmet 
            title={`Không tìm thấy trang - ${config.SEO_DEFAULT_TITLE}`}
            />
    }

	render() {
		return <div className="container">
			<div className={s.root404}>
				{this.helmetRender()}
				<div className={s.notfoundText}>404</div>
				<div className={s.notfoundMsg}>Trang bạn tìm không có, hãy thử về <Link to="/">trang chủ</Link>, hoặc thử tìm kiếm</div>
				<div className={s.notfoundSearchBox}>
	            	<form onSubmit={this.onSubmitSearch.bind(this)}>
						<input placeholder="Nhập từ khóa" value={this.state.q} onChange={this.handleInputChange.bind(this)} />
					</form>
				</div>
			</div>

		</div>;
	}
}

export default withStyles(s)(NotFound);