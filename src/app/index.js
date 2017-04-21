import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WithStylesContex from './../global/WithStylesContext';
import store from './store';

import List from './../list';

export default class App {
	constructor() {
		render(
		    <WithStylesContex onInsertCss={styles => Array.isArray(styles) ? styles.map((style)=>{style._insertCss()}): styles._insertCss()}>
		        <Provider store={store}>
		            <List />
		        </Provider>
		    </WithStylesContex>,
			document.getElementById('root')
		);
	}
}