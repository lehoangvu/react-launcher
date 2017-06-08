import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import s from '../styles/chart.scss';

class ActivityChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
    	const start_time = this.props.data.start_time;
    	const activity = this.props.data.activity;
    	let chartData = [];
    	let step = 12 * 3600000;
    	console.log(start_time);
    	console.log(new Date().getTime());
    	// return;
    	let maxValue = 0;
    	for(let i = start_time; i < new Date().getTime() + step * 3; i = i + step) {
    		let count = 0;
    		for(let j = 0; j < activity.length; j++) {
    			let item = activity[j];
    			if(item.create_at >= i && item.create_at <= i + step ) {
    				count++;
    			}
    		};
    		if(maxValue < count) maxValue = count;
    		let col = {
    			count,
    			time: new Date(i)
    		};
    		chartData.push(col);
    	}
        return (
            <div className={s.root}>
			    	<BarChart
			    	 	width={600}
			    	 	height={300}
			    	 	data={chartData}
			    	 	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				       <XAxis dataKey="time"/>
				       <YAxis domain={[0, Math.round(maxValue * 1.5)]}/>
				       <ReferenceLine y={0} stroke='#000'/>
				       <Bar dataKey="count" fill="#8884d8" />
			      </BarChart>
            </div>
        );
    }
}
export default withStyles(s)(ActivityChart);
