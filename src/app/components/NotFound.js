import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/app.scss';

class NotFound extends React.Component{
	constructor(props) {
		super(props);
	}

    componentDidMount() {
        
    }

	render() {
		return <div className={s.root404}>
			Notfound
		</div>;
	}
}

export default withStyles(s)(NotFound);