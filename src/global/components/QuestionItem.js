import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/question-item.scss';
import Tags from './Tags';
import Helper from './../helper';

import MarkdownIt from 'markdown-it';
import striptags from "striptags";

// import 
class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
    }
    renderTag() {
        let tags = this.props.item.tags && this.props.item.tags.map((tag, index) => {
            return <a key={index} href={Helper.removeSigh(tag)} title="">{tag}</a>;
        })
        return (
            <Tags>
                {tags}
            </Tags> 
        )
    }
    getCreateText() {
        let item = this.props.item;
        moment.locale('vi');
        let dateString = moment.unix(Math.round(item.create_at / 1000)).format("YYYYMMDD");
        let create_at = moment(dateString, 'YYYYMMDD').fromNow();
        return `Đăng ${create_at}`;

    }

    getLink() {
        let slug = this.props.item.url || Helper.slugify(this.props.item.title);
        let id = this.props.item.id;
        return 'questions/' + id + '/' + slug;
    }

    render() {
        const item = this.props.item;
        const user = item.user;
        const content = striptags(new MarkdownIt().render(item.content));
        let preview = content.substr(0, 200);
        if(content.length >= 200) {
            preview += '...';
        }
        return (
            <div className={s.root}>
                <div className={s.attributeWrap}>
                    <span className={s.vote}>
                        <span>{item.vote}</span>
                        <span>votes</span>
                    </span>

                    <span className={s.reply}>
                        <span>{item.reply}</span>
                        <span>replies</span>
                    </span>

                    <span className={s.view}>
                        <span>{item.view}</span>
                        <span>views</span>
                    </span>
                </div>
                <div className={s.summary}>
                    <h3>
                        <Link to={this.getLink()}>{item.title}</Link>
                    </h3>
                    <p className={s.description}>
                        {preview}
                    </p>
                    {this.renderTag()} 
                    <div className={s.meta}>
                        <span className={s.update_at}>{this.getCreateText()}</span> bởi <Link to={"user/" + user.nickname} className={s.author}>{user.fullname}</Link>
                    </div>  
                </div>
            </div>
        );
    }
}

export default withStyles(s)(QuestionItem);