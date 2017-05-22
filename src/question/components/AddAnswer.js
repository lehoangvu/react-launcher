import React from 'react';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../styles/add-answer.scss';
import MarkdownIt from 'markdown-it';

class AddAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            markdown_code: '',
            disable_form: false,
            loading_form: false
        }
    }

    _onChange() {

    }

    validContent(value) {
        if(!value || value.length === 0) {
            return 'Hãy nhập nội dung';
        }
        if(value.length < 60) {
            return 'Nội dung dài hơn 60 ký tự';
        }
    }

    handleValidate(values) {
        const {content} = values;
        return {
            content: this.validContent(content)
        }
    }

    handleValidateFail() {

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

        this.props.onAnswer(values.content);
    }
    render() {
        return (
            <div className={s.root}>
                <h3 className={s.title}>Trả lời</h3>
                <Form
                    onSubmit={this.handleSubmit}
                    validate={this.handleValidate}
                    onValidationFail={this.handleValidateFail} >
                     {({ values, submitForm, addValue, removeValue, getError }) => {
                        return <form onSubmit={submitForm}>
                            <div className={s.formGroup}>
                                <Textarea disabled={this.state.disable_form} field='content' placeholder='Nhập nội dung chi tiết ?' onChange={(val, onChange) => {this.setState({markdown_code: val.currentTarget.value}); onChange()}} />
                                <div className={s.preview} style={{display: this.state.markdown_code.length > 0 ? 'block' : 'none'}}>
                                    <div className="markdown-render" dangerouslySetInnerHTML={this.renderMarkDown()} />
                                </div>
                            </div>
                            <div className={s.formGroup}>
                                <button disabled={this.state.disable_form} className={this.state.loading_form ? "btn loading" : "btn"} type="submit">Gửi câu hỏi</button>
                            </div>
                        </form>
                    }}
                </Form>
            </div>
        );
    }
}
export default withStyles(s)(AddAnswer);