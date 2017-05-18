import React from 'react';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form';

import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/detail.scss';
import { Skeleton, Tags, UserBox, VoteButton } from './../../global';
import MarkdownIt from 'markdown-it';
class DetailQuestion extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getDetail(this.props.params.id);
    }

    getCreateText() {
        let item = this.props.detail;
        moment.locale('vi');
        let dateString = moment.unix(Math.round(item.create_at / 1000)).format("lll");
        return `Đăng lúc ${dateString}`;

    }

    componentWillReceiveProps(nextProps) {
        // this.props.actions.getDetail(this.props.params.id);
        console.log(nextProps);
    }

	renderMarkDown(content) {
		return {
			'__html' : new MarkdownIt().render(content)
		}
	}

    
    renderTag() {
        let tags = this.props.detail.tags && this.props.detail.tags.map((tag, index) => {
            return <a key={index} href={Helper.removeSigh(tag)} title="">{tag}</a>;
        })
        return (
            <Tags>
                {tags}
            </Tags> 
        )
    }

    render() {
        const detail = this.props.detail;
        if(!detail) {
            return (
                <div className="container">
                    <div className={s.summary}>
                        <Skeleton wrap={true}>
                            <Skeleton w='80%' h='20px' mb='30px'/>
                            <Skeleton w='80%' mb='30px' h='300px'/>
                            <Skeleton w='300px' h='30px'/>
                        </Skeleton>
                    </div>
                </div>
            );
        }
        return (
        	<div className={s.root}>
            	<div className="container">
	            	<div className={s.summary}>
                        <h1 className={s.title}>{detail.title}</h1>
                        <div className={s.left}>
                            <VoteButton />
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
            		
            		<div className={s.sidebar}>
		    		</div>

		    	</div>
		    </div>
		);
    }
}
export default withStyles(s)(DetailQuestion);