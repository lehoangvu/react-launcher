import React from 'react';
import ReactDOM from "react-dom";
import cache from './../../global/libraries/cache';
import { Link } from 'react-router';
import { Skeleton } from './../../global';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './../styles/sidebar.scss';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    getNewest() {
        let html;
        const newestData = this.props.data.newest;
        if(!newestData) {
            html = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item)=>{
                if(item % 2 === 0)
                    return <Skeleton key={item} w="70%" h="16px" mb="5px" mt="5px" />
                else
                    return <Skeleton key={item} w="100%" h="16px" mb="5px" mt="5px" />
            });
        } else {
            html = newestData.map((item, index)=>{
                let iconImg = false;
                let icon = Helper.getTagIcon(item.title, 1)
                            .concat(Helper.getTagIcon(item.tags.join(' '), 1)
                            .concat(Helper.getTagIcon(item.content, 1)));
                if(icon.length === 1) {
                    iconImg = <img className={s.tagIcon} src={icon[0].fileurl} alt={icon[0].name} />
                }

                return <Link key={index} className={s.newestItem} to={`/questions/${item.id}/${item.url}`}>{iconImg}<span>{item.title}</span></Link>;

            });
        }

        return <div className={s.newestList}>
                {html}
            </div>;
    }

    render() {
        const data = this.props.data;

        return <div className={s.root}>
            <div className={s.rootDiscussFeed}>
                <h3>Phản hồi mới nhất</h3>
                <Link className="btn pull-right" to="/questions/add">Hỏi ngay!</Link>
            </div>
            {this.getNewest()}

        </div>
    }
}

export default  withStyles(s)(Sidebar)