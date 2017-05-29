import React from 'react';
import { Link } from 'react-router';
import s from './styles/pagination.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    onPageClick() {
        if(this.props.onChange) {
            this.props.onChange()
        }

    }

    getPageUri(page) {
        const uri = this.props.uri;
        if(uri.indexOf('?') !== -1) {
            return uri + `&page=${page}`;
        }
        return uri + `?page=${page}`;

    }

    render() {
        let { current, limit, total } = this.props;
        current = parseInt(current);
        const num_page = Math.ceil(total / limit);

        let preview;
        let next;
        let previewDot;
        let nextDot;
        let begin;
        let to;
        let cache = 8;


        if(current - cache > 1) {
            begin = current - cache;
            previewDot = <div className={s.empty}>...</div>;
        } else {
            begin = 1;
        }

        if(current + cache < num_page) {
            to = current + cache;
            nextDot = <div className={s.empty}>...</div>;
        } else {
            to = num_page;
        }

        if(current > 2) {
            preview = <Link to={this.getPageUri(current - 1)}>Trang trước</Link>
        }
        if(current < num_page - 1) {
            next = <Link to={this.getPageUri(current + 1)}>Trang sau</Link>
        }

        let pages = [];
        if(begin !== to) {
            for(let i = begin; i <= to; i++) {
                if(i !== current) {
                    pages.push(<Link key={i} to={this.getPageUri(i)}>{i}</Link>);
                } else {
                    pages.push(<span key={i}>{i}</span>);
                }
                    
            }
        }

        return (
            <div className={s.root}>
                {preview}
                {previewDot}
                {pages}
                {nextDot}
                {next}
            </div>
        );
    }
}

export default withStyles(s)(Pagination);