import React from 'react';
import classNames from 'classnames';

export default class TabPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let classes = {
            'tab-content': true
        };
        if(this.props.active) {
            classes['active'] = true;
        }

        return (
            <div className={classNames(classes)}>
                {this.props.children}
            </div>
        );
    }
}