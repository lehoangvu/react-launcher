import React from 'react';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/add-form.scss';
import MarkdownIt from 'markdown-it';
class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        	markdown_code: this.props.form.data.content,
            disable_form: false,
            loading_form: false
        }
    }

    _onChange() {

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
    	console.log(value);
    	if(!value || value.length === 0) {
    		return 'Hãy nhập nội dung';
    	}
    	if(value.length < 60) {
    		return 'Nội dung dài hơn 80 ký tự';
    	}
    }

    handleValidate(values) {
    	const {title, content, tag} = values;
    	return {
    		title: this.validTitle(title),
    		content: this.validContent(content)
    	}
    }

	handleValidateFail() {
		alert('fail');
	}

	renderMarkDown() {
		return {
			'__html' : new MarkdownIt().render(this.state.markdown_code)
		}
	}

	handleSubmit(values) {

        this.setState({
            disable_form: true,
            loading_form: true
        })

        this.props.actions.create({
            ...values
        });
	}

    render() {
        return (
        	<div className={s.root}>
            	<div className="container">
	            	<div className={s.form}>
			        	<Form
						    onSubmit={this.handleSubmit}
						    validate={this.handleValidate}
						    onValidationFail={this.handleValidateFail} >
						     {({ values, submitForm, addValue, removeValue, getError }) => {
						     	return <form onSubmit={submitForm}>
								    <div className={s.formGroup}>
								    	<label>Bạn muốn hỏi gì ?</label>
								    	<Text disabled={this.state.disable_form} field='title' placeholder='Nhập nội dung ngắn gọn của câu hỏi ?' />
								    </div>
								    <div className={s.formGroup}>
								    	<label>Nội dung chi tiết</label>
								    	<Textarea disabled={this.state.disable_form} field='content' placeholder='Nhập nội dung chi tiết ?' onChange={(val, onChange) => {this.setState({markdown_code: val.currentTarget.value}); onChange()}} />
								    	<div className={s.preview} style={{display: this.state.markdown_code.length > 0 ? 'block' : 'nones'}}>
									    	<div className="markdown-render" dangerouslySetInnerHTML={this.renderMarkDown()} />
								    	</div>
								    </div>
								    <div className={s.formGroup}>
								    	<label>Thêm tag cho câu hỏi để dễ dàng tìm kiếm</label>
								    	<Text disabled={this.state.disable_form} field='tags' placeholder='Nhập các tag cách nhau bởi dấu ","' />
								    </div>
								    <div className={s.formGroup}>
								    	<button disabled={this.state.disable_form} className={this.state.loading_form ? "btn loading" : "btn"} type="submit">Gửi câu hỏi</button>
								    </div>
							    </form>
							}}
						</Form>
				    </div>
            		
            		<div className={s.tip}>
            			<div className="markdown-render">
            				<br/>
            				<h4>Tiêu đề rõ ràng</h4>
            				<p>Đôi khi sau khi nghĩ kỹ hơn về câu hỏi, bạn sẽ tìm ra câu trả lời :)</p>

            				<br/>
            				<br/>
            				<h4>Nội dung được viết bằng <a target="_blank" href="#">Markdown</a></h4>
            				<p>
            					Các code hay được dùng là :
            				</p>
        					<ul>
        						<li><code>#</code> cho H1</li>
        						<li><code>```</code> cho code</li>
        						<li><code>`</code> để bôi đậm</li>
        					</ul>
		    			</div>
		    		</div>

		    	</div>
		    </div>
		);
    }
}
export default withStyles(s)(AddQuestion);