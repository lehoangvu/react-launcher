import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/pagination.scss';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className={s.root}>
                <a>Trang trước</a>
                <a>1</a>
                <div className={s.empty}>...</div>
                <a>2</a>
                <a>3</a>
                <span>4</span>
                <a>5</a>
                <div className={s.empty}>...</div>
                <a>Trang sau</a>
            </div>
        );
    }
}

export default withStyles(s)(Pagination);