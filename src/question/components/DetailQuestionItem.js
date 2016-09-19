import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/detail-item.scss';
import { Skeleton, Tags, UserBox, VoteButton } from './../../global';
import MarkdownIt from 'markdown-it';

class DetailQuestionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    getCreateText() {
        let item = this.props.detail;
        moment.locale('vi');
        let dateString = moment.unix(Math.round(item.create_at / 1000)).format("lll");
        return `Đăng lúc ${dateString}`;

    }

    componentWillReceiveProps(nextProps) {

    }

	renderMarkDown(content) {
		return {
			'__html' : new MarkdownIt().render(content)
		}
	}

    
    renderTag() {
        let tags = this.props.detail.tags && this.props.detail.tags.map((tag, index) => {
            return <Link key={index} to={"/tagged/" + Helper.removeSigh(tag)} title="">{tag}</Link>;
        })
        return (
            <Tags>
                {tags}
            </Tags> 
        )
    }

    render() {
        const detail = this.props.detail;
        return (
            <div className={s.root}>
                {(detail.type === 'question' ? <h1 className={s.title}>{detail.title}</h1> : '')}
                <div className={s.left}>
                    <VoteButton 
                    user={this.props.user}
                    id={detail.id}
                    onVote={this.props.onVote}
                    voted={detail.voted}
                    down_voted={detail.down_voted}
                    vote={detail.vote}
                    down_vote={detail.down_vote}
                     />
                </div>
                <div className={s.right}>
                    <div className={s.contentWrap}>
                        <div className="markdown-render" dangerouslySetInnerHTML={this.renderMarkDown(detail.content)} />
                    </div>
                    <div className={s.tagWrap}>
                        {this.renderTag()}
                    </div>
                    <div className={s.metaWrap}>
                        <div className={s.authorBox}>
                            <span>{this.getCreateText()}</span>
                            <UserBox user={detail.user}/>
                        </div>
                    </div>
                </div>
            </div>
		);
    }
}
export default withStyles(s)(DetailQuestionItem);