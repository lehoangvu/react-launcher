import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/detail-item.scss';
import { Tags, UserBox, VoteButton } from './../../global';
import MarkdownIt from 'markdown-it';
import { Form, Text, Textarea } from 'react-form';

class DetailQuestionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editable: props.user && props.user.nickname === props.detail.user.nickname,
            disable_form: false,
            loading_form: false,
            detail: props.detail
        };
        this.onEdit = this.onEdit.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({
            editing: false,
            disable_form: false,
            loading_form: false,
            editable: nextProps.user && nextProps.user.nickname === nextProps.detail.user.nickname,
            detail: nextProps.detail
        })
    }

	renderMarkDown(content) {
		return {
			'__html' : new MarkdownIt().render(content)
		}
	}

    
    renderTag() {
        return (
            <Tags data={this.props.detail.tags} /> 
        )
    }

    handleSubmit(values) {
        this.setState({
            disable_form: true,
            loading_form: true
        })

        this.props.onUpdate({
            ...values,
            type: this.props.detail.type,
            id: this.props.detail.id
        });
    }
    handleValidate(values) {
        if(this.props.detail.type === 'question') {
            const {title, content} = values; 
            return {
                title: this.validTitle(title),
                content: this.validContent(content)
            }
        } else {
            const {content} = values;
            return {
                content: this.validContent2(content)
            }
        }
    }

    validTitle(value) {
    	if(!value || value.trim().length === 0) {
    		return 'Hãy nhập tiêu đề';
    	}
    	value = value.trim();
    	if(value.length < 10 || value.length > 80) {
    		return 'Tiêu đề từ 10 đến 80 ký tự';
    	}
    }

    validContent(value) {
    	if(!value || value.length === 0) {
    		return 'Hãy nhập nội dung';
    	}
    	if(value.length < 60) {
    		return 'Nội dung dài hơn 80 ký tự';
    	}
    }

    validContent2(value) {
        if(!value || value.length === 0) {
            return 'Hãy nhập nội dung';
        }
        if(value.length < 60) {
            return 'Nội dung dài hơn 60 ký tự';
        }
    }

    handleValidateFail() {

    }

    onEdit(e) {
        this.setState({
            editing: !this.state.editing
        });
    }

    onCancelEdit(e) {
        this.setState({
            editing: false,
            detail: this.props.detail
        });
    }

    render() {
        const detail = this.props.detail;
        if(!this.state.editing) {
            return (
                <div className={s.root}>
                    {(detail.type === 'question' ? <h1 className={s.title}>{detail.title}</h1> : '')}
                    <div className={s.left}>
                        <VoteButton 
                        user={this.props.user}
                        id={detail.id}
                        owner={detail.user}
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
                            {(detail.type === 'question' ? this.renderTag() : '')}
                        </div>
                        <div className={s.metaWrap}>
                            <div className={s.actions}>
                                {this.state.editable ? <span onClick={this.onEdit}>Chỉnh sửa</span> : <span>Báo xấu</span>}
                                
                            </div>
                            <div className={s.authorBox}>
                                <span>{this.getCreateText()}</span>
                                <UserBox user={detail.user}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={s.root}>
                    <Form
                        defaultValues={{
                            title: this.state.detail.title,
                            content: this.state.detail.content,
                            tags: this.state.detail.tags.join(', ')
                        }}
                        onSubmit={this.handleSubmit}
                        validate={this.handleValidate}
                        onValidationFail={this.handleValidateFail} >
                            {({ values, submitForm, addValue, removeValue, getError }) => {
                            return <form onSubmit={submitForm}>
                                {(detail.type === 'question' ? 
                                <div className={s.formGroup}>
                                    <Text disabled={this.state.disable_form} field='title' placeholder='Nhập nội dung ngắn gọn của câu hỏi ?' />
                                </div>
                                 : '')}
                                
                                <div className={s.formGroup}>
                                    <Textarea disabled={this.state.disable_form} field='content' placeholder='Nhập nội dung chi tiết ?' onChange={(val, onChange) => {this.setState({detail: {...this.state.detail, content: val.currentTarget.value}}); onChange()}} />
                                    <div className={s.preview} style={{display: this.state.detail.content.length > 0 ? 'block' : 'none'}}>
                                        <div className="markdown-render" dangerouslySetInnerHTML={this.renderMarkDown(this.state.detail.content)} />
                                    </div>
                                </div>
                                {(detail.type === 'question' ? 
                                <div className={s.formGroup}>
                                    <Text disabled={this.state.disable_form} field='tags' placeholder='Nhập các tag cách nhau bởi dấu ","' />
                                </div>
                                 : '')}
                                <div className={s.formGroup}>
                                    <button disabled={this.state.disable_form} className={this.state.loading_form ? "btn loading" : "btn cancle"} onClick={this.onCancelEdit}>Hủy</button>
                                    <button disabled={this.state.disable_form} className={this.state.loading_form ? "btn loading" : "btn"} type="submit">Lưu thay đổi</button>
                                </div>
                            </form>
                        }}
                    </Form>
                </div>
            );
        }
    }
}
export default withStyles(s)(DetailQuestionItem);