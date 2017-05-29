import React from 'react';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form';

import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/detail.scss';
import { Skeleton, Tags, UserBox, VoteButton } from './../../global';
import MarkdownIt from 'markdown-it';
import Helmet from "react-helmet";
import striptags from "striptags";

import AddAnswer from './AddAnswer';
import DetailQUestionItem from './DetailQUestionItem';
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

    helmetRender() {
        const detail = this.props.detail;
        return <Helmet 
            title={detail.title}
            link={[
                {"rel": "canonical", "href": config.BASE_URL + `questions/${detail.id}/${detail.url}`}
            ]}
            meta={[
                {name: 'description', content: striptags(new MarkdownIt().render(detail.content))}
            ]} />
    }

    render() {
        const detail = this.props.detail;
        if(!detail) {
            return (
                <div className="container">
                    <div className={s.summary}>
                        <Skeleton w='80%' h='20px' mb='30px'/>
                        <Skeleton wrap={true} mb='20px'>
                            <Skeleton w='100px' h='100px' mr='20px'/>
                            <Skeleton w='calc(100% - 120px)' h='120px' mb='20px' />
                            <Skeleton fl='right' w='100px' h='40px'/>
                        </Skeleton>
                        <Skeleton wrap={true} mb='20px'>
                            <Skeleton w='100px' h='100px' mr='20px'/>
                            <Skeleton w='calc(100% - 120px)' h='120px' mb='20px' />
                            <Skeleton fl='right' w='100px' h='40px'/>
                        </Skeleton>
                        <Skeleton wrap={true} mb='20px'>
                            <Skeleton w='100px' h='100px' mr='20px'/>
                            <Skeleton w='calc(100% - 120px)' h='120px' mb='20px' />
                            <Skeleton fl='right' w='100px' h='40px'/>
                        </Skeleton>
                    </div>
                </div>
            );
        }
        let last_ans_id = '';
        return (
        	<div className={s.root}>
                {this.helmetRender()}
            	<div className="container">
	            	<div className={s.summary}>
                        <DetailQUestionItem 
                            user={this.props.user} 
                            detail={detail} 
                            onVote={this.props.actions.vote} 
                            onUpdate={this.props.actions.update} />
                        {detail.answers.data.map((answer)=>{
                            last_ans_id = answer.id;
                            return <DetailQUestionItem 
                                user={this.props.user} 
                                key={answer.id} 
                                detail={answer} 
                                onVote={this.props.actions.vote}
                                onUpdate={this.props.actions.update} />
                        })}
                        <AddAnswer key={last_ans_id} onAnswer={(content) => this.props.actions.answer(detail.id, content)} />
				    </div>
            		<div className={s.sidebar}>
		    		</div>

		    	</div>
		    </div>
		);
    }
}
export default withStyles(s)(DetailQuestion);