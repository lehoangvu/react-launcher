import React from 'react';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/question-item.scss';
class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
    }
    renderTag() {
        let tags = this.props.item.tags && this.props.item.tags.map((tag, index) => {
            return <a key={index} href={Helper.removeSigh(tag)} title="">{tag}</a>;
        })
        return (
            <div className={s.tags}>
                {tags}
            </div> 
        )
    }
    getCreateText() {
        let item = this.props.item;
        moment.locale('vi');
        let dateString = moment.unix(Math.round(item.create_at / 1000)).format("YYYYMMDD");
        let create_at = moment(dateString, 'YYYYMMDD').fromNow();
        return `Đăng ${create_at}`;

    }
    render() {
        const item = this.props.item;
        const user = item.user;
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
                        <a href="#">{item.title}</a>
                    </h3>
                    {this.renderTag()} 
                    <div className={s.meta}>
                        <span className={s.update_at}>{this.getCreateText()}</span> bởi <a className={s.author}>{user.fullname}</a>
                    </div>  
                </div>
            </div>
        );
    }
}

export default withStyles(s)(QuestionItem);