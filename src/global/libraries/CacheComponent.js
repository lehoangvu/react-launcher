import React from 'react';
import LRU from "lru-cache";

const options = {
    max: 500,
    length: (n, key) => {return n.length},
    maxAge: 1000 * 60 * 60
};
const cache = LRU(options);


class CacheComponent extends React.Component {
	constructor(props) {
		super(props);
		// console.log(props);
	}
	render() {
		if(typeof __SERVER__ !== 'undefined') {
			// It will check cache, if not cache, render child
			const { keyCache } = this.props;
			const element = cache.get(keyCache);
			if(element) {
				return element;
			}
			cache.set(keyCache, this.props.children);
		}
		return this.props.children;
	}
}
export default CacheComponent;
