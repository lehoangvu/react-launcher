import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/app.scss';
import Helmet from "react-helmet";

class NotFound extends React.Component{
	constructor(props) {
		super(props);
	}

    componentDidMount() {
        
    }


    helmetRender() {
        return <Helmet 
            title={`Không tìm thấy trang - ${config.SEO_DEFAULT_TITLE}`}
            />
    }

	render() {
		return <div className={s.root404}>
			{this.helmetRender()}
			<div className={s.notfoundImage}>
				<span>4</span>
				<img src="/public/img/logo.svg" />
				<span>4</span>
			</div>
		</div>;
	}
}

export default withStyles(s)(NotFound);