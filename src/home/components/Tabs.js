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

    componentDidMount() {
        this.props.list.map((item) => {
            item.current && this.props.getTabList(item.query, 1);
        })
    }

    getTabNav() {
        let tabNav = this.props.list.map((item, index)=>{
            return item.current ? <li key={index} className={s.tabNavActive}><a href="javascript:">{item.title}</a></li> : <li key={index}><a href="javascript:">{item.title}</a></li>;
        });
        return (
            <div className={s.tabNav}>
                <label className={s.bigLabel}>Top câu hỏi</label>
                <ul>
                    {tabNav}
                </ul>
            </div>
        );
    }

    render() {
        return <div className={s.root}>
            {this.getTabNav()}
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