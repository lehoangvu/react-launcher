import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/tabs.scss';

import { QuestionItem, Pagination } from './../../global';

class HomeTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    _onChange() {

    }

    render() {
        return <div className={s.root}>
            <div className={s.tabNav}>
                <label className={s.bigLabel}>Top câu hỏi</label>
                <ul>
                    <li className={s.tabNavActive}><a href="">Mới nhất</a></li>
                    <li><a href="">Hữu ích</a></li>
                    <li><a href="">Phản hồi</a></li>
                </ul>
            </div>
            <div className={s.tabContent}>
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <Pagination />
            </div>
        </div>
    }
}

export default  withStyles(s)(HomeTabs)