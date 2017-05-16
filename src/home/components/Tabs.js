import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import s from './../styles/tabs.scss';

import { Skeleton } from './../../global';

import { QuestionItem, Pagination } from './../../global';

class HomeTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    _onChange() {

    }

    setCurrentTabByQuery(props) {
        let sort = 'newest';
        if(typeof props.query.tab !== 'undefined') {
            sort = props.query.tab;
        }
        props.setCurentTab(sort, this.props.query.page);
    }

    componentDidMount() {
        this.setCurrentTabByQuery(this.props);
        // this.props.getTabList(this.props.query.tab, this.props.query.page);
    }

    componentWillReceiveProps(nextProps) {
        if(typeof (this.props.query.tab) === 'undefined' || nextProps.query.tab !== this.props.query.tab) {
            return this.setCurrentTabByQuery(nextProps);
        }
        if(typeof nextProps.query.page !== 'undefined' && (typeof (this.props.query.page) === 'undefined' || nextProps.query.page !== this.props.query.page)) {
            return this.props.getTabList(nextProps.query.tab, nextProps.query.page);
        }
    }

    getTabNav() {
        let tabNav = this.props.tabs.map((item, index)=>{
            return item.current ? <li key={index} className={s.tabNavActive}><Link to={"/?tab=" + item.query}>{item.title}</Link></li> : <li key={index}><Link to={"/?tab=" + item.query}>{item.title}</Link></li>;
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

    generateUri() {
        let tab;
        this.props.tabs.map((item) => {
            if(item.current) tab = item.query;
        })
        return `/?tab=${tab}`;
    }

    renderList() {
        if(this.props.list.loading) {
            return [1, 2, 3, 4].map((i)=>{
                return <Skeleton key={i} wrap={true} mb="30px" mt="20px">
                    <Skeleton w="168px" h="60px" mr="10px" />
                    <Skeleton w="calc(100% - 178px)" h="15px" mb="20px" />
                    <Skeleton w="200px" h="25px" />
                    <Skeleton w="200px" h="15px" fl="right" />
                </Skeleton>
            })
        }
        return this.props.list.data.map((item, index) => {
            return <QuestionItem key={index} item={item} />
        })
    }

    render() {
        return <div className={s.root}>
            {this.getTabNav()}
            <div className={s.tabContent}>
                {this.renderList()}
                <Pagination uri={this.generateUri()} total={this.props.list.total} limit={this.props.list.limit} current={this.props.list.current} />
            </div>
        </div>
    }
}

export default  withStyles(s)(HomeTabs)