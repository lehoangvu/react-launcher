import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import s from '../styles/activity-chart.scss';

class ActivityChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
    	const start_time = this.props.data.start_time;
    	const activity = this.props.data.activity;
        const currentTime = new Date().getTime();
    	let chartData = [];
    	let step = (currentTime - start_time) / 100;
    	let maxValue = 0;
        console.log(start_time - currentTime);
    	for(let i = start_time; i <= currentTime + step; i = i + step) {
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
            console.log(chartData);
        return (
            <div className={s.root}>
                <h2>Biểu đồ hoạt động</h2>
		    	<BarChart
                    width={1170}
		    	 	height={250}
		    	 	data={chartData} >
			       <XAxis dataKey="time" 
                        stroke='#2196f3'
                        label={'Thời gian'}/>
			       <YAxis domain={[0, Math.round(maxValue * 1.5)]}
                        stroke='#2196f3'
                        allowDecimals={false}
                        label={'Hoạt động'}/>
			       <Bar dataKey="count" fill="#ffd740" />
                </BarChart>
            </div>
        );
    }
}
export default withStyles(s)(ActivityChart);
