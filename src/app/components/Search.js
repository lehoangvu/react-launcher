import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/search.scss';
import { browserHistory } from 'react-router';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: this.props.q || ''
        }
    }

    onSubmitSearch(e) {
        e.preventDefault();
        browserHistory.push(`/search?q=${this.state.q}`)
    }

    handleInputChange(e) {
        this.setState({q:e.currentTarget.value});
    }

    render() {
        return <div className={s.root}>
            <form onSubmit={this.onSubmitSearch.bind(this)}>
                <div className={s.form}>
                    <input value={this.state.q} type="text" placeholder="Tìm kiếm..." className={s.searchInput} onChange={this.handleInputChange.bind(this)} />
                    <span className={s.submitBtn} >
                        <i className="ion-ios-search-strong" />
                    </span>
                </div>
            </form>
        </div>
    }
}

export default withStyles(s)(Search);