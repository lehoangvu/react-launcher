import React from 'react';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/add-form.scss';
import MarkdownIt from 'markdown-it';
class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	form: this.props.form
        }
    }

    _onChange() {

    }

    handleValidate() {

    }

	handleValidateFail() {

	}

	handleInputChange(value, name) {
		const newState = this.state;
		this.state.form[name] = value;
		this.setState({
			...this.state,
			...newState
		})
	}

	renderMarkDown() {
		return {
			'__html' : new MarkdownIt().render(this.state.form.content)
		}
	}

    render() {
        return (
        	<div className="root">
            	<div className="container">
		        	<Form className={s.root}
					    onSubmit={this.handleSubmit}
					    validate={this.handleValidate}
					    onValidationFail={this.handleValidateFail} >
					    <div className={s.formGroup}>
					    	<label>Bạn muốn hỏi gì ?</label>
					    	<Text field='title' placeholder='Nhập nội dung ngắn gọn của câu hỏi ?' />
					    </div>
					    <div className={s.formGroup}>
					    	<label>Nội dung chi tiết</label>
					    	<Textarea field='content' placeholder='Nhập nội dung chi tiết ?' onChange={val => this.handleInputChange(val.currentTarget.value, 'content')} />
					    	<div className={s.preview} dangerouslySetInnerHTML={this.renderMarkDown()}>
					    		
					    	</div>
					    </div>
					    <div className={s.formGroup}>
					    	<label>Thêm tag cho câu hỏi để dễ dàng tìm kiếm</label>
					    	<Text field='tag' placeholder='Nhập các tag cách nhau bởi dấu ","' />
					    </div>
					    <button className="btn">Gửi câu hỏi</button>
					</Form>
		    	</div>
		    </div>
		);
    }
}
export default withStyles(s)(AddQuestion);