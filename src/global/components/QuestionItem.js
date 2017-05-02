import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/question-item.scss';

class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className={s.root}>
                <div className={s.attributeWrap}>
                    <span className={s.vote}>
                        <span>34</span>
                        <span>votes</span>
                    </span>

                    <span className={s.reply}>
                        <span>12</span>
                        <span>replies</span>
                    </span>

                    <span className={s.view}>
                        <span>5k</span>
                        <span>views</span>
                    </span>
                </div>
                <div className={s.summary}>
                    <h3>
                        <a href="#">How to generate a random 4 digit number not starting with 0 and having unique digits?</a>
                    </h3>
                    <div className={s.tags}>
                        <a href="" title="">javascript</a>
                        <a href="" title="">json</a>
                    </div>  
                    <div className={s.meta}>
                        <span className={s.update_at}>Cập nhật cách đây 2 phút</span> bởi <a className={s.author}>Lê Hoàng Vũ</a>
                    </div>  
                </div>
            </div>
        );
    }
}

export default withStyles(s)(QuestionItem);