import React from 'react';
import WithStylesContex from './../../global/WithStylesContext';
import s from './styles/tab.scss';

import RcTabs, { RcTabPane } from 'rc-tabs';
import RcTabContent from 'rc-tabs/lib/TabContent';
import RcScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
console.log(RcTabs);

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }
    _onChange(key) {
        console.log(key);
    }
    render() {
        return (
            <div className={s.root}>
                <RcTabs
                  defaultActiveKey="2"
                  onChange={this._onChange}
                  renderTabBar={()=><RcScrollableInkTabBar />}
                  renderTabContent={()=><RcTabContent />}
                >
                    {this.props.children}
                </RcTabs>
            </div>
        );
    }
}