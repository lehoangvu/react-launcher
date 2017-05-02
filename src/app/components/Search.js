import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/search.scss';
class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={s.root}>
            <div className={s.form}>
                <input type="text" placeholder="Tìm kiếm..." className={s.searchInput} />
                <span className={s.submitBtn} >
                    <i className="ion-ios-search-strong" />
                </span>
            </div>
        </div>
    }
}

export default withStyles(s)(Search);