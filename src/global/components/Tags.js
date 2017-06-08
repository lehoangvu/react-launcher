import React from 'react';
import { Link } from 'react-router';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles/snippet.scss';

class Tags extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let tags = this.props.data.map((tag, index) => {
            let iconImg;
            let icon = Helper.getTagIcon(tag, 1);
            if(icon.length === 1) {
                iconImg = <img className={s.tagIcon} src={icon[0].fileurl} alt={icon[0].name} />
            }
            return <Link key={index} to={"/tagged/" + Helper.removeSigh(tag)} title="">{iconImg}{tag}</Link>;
        })
        return (
            <div className={s.tags}> 
                {tags}
            </div>
        );
    }
}

export default withStyles(s)(Tags);