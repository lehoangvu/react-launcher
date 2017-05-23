import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
import s from './styles/tabs.scss';
import Skeleton from './Skeleton';
import QuestionItem from './QuestionItem';
import Pagination from './Pagination';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setCurentTab(this.props.q || '', this.props.tab, this.props.page);
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.tab !== this.props.tab
            || nextProps.q !== this.props.q
            || this.props.page !== nextProps.page ) {
            return this.props.setCurentTab(nextProps.q, nextProps.tab, nextProps.page);
        }
    }

    createTabLink(item) {
        return `${this.props.base_url}?q=${this.props.q}&tab=${item.query}`;
    }

    getTabNav() {
        let tabNav = this.props.tabs.map((item, index)=>{
            return item.current ? <li key={index} className={s.tabNavActive}><span className={s.link}>{item.title}</span></li> : <li key={index}><Link className={s.link} to={this.createTabLink(item)}>{item.title}</Link></li>;
        });
        return (
            <div className={s.tabNav}>
                <label className={s.bigLabel}>{this.props.navText || `Top câu hỏi` }</label>
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
        if(this.props.list.data.length === 0) {
            if(this.props.q === '') {
                return <p className={s.noResult}>Chưa có câu hỏi nào, hãy <Link to="/questions/add">đặt câu hỏi</Link></p>
            } else {
                return <p className={s.noResult}>Chưa có ai thắc mắc về <code>{this.props.q}</code>, hãy <Link to="/questions/add">đặt câu hỏi</Link></p>
            }
        }
        return this.props.list.data.map((item, index) => {
            return <QuestionItem key={index} item={item} />
        });
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

export default  withStyles(s)(Tabs)