import axios from 'axios';

const _ajax = (option) => {
	const url = option.url;
	const data = option.data || {};
	let method = 'get';
	if(option.type) {
		switch(option.type) {
			case 'POST': 
				method = 'post';
				break;
		}
	}
	let _done = null, _catch = null;
	let httpRequest = axios[method](url, { proxy: { host: '127.0.0.1', port: 5100 } }, data)
	.then((response) => {
		console.log('done', _done);
		if(_done !== null) 
			_done(response.data);
	}).catch((err) => {
		if(_catch !== null) 
			_catch(err);
	});
	let returnObj = {
		done: (resolve) => {
			_done = resolve;
			return returnObj;
		},
		fail: (reject) => {
			_catch = reject;
			return returnObj;
		}
	};
	return returnObj;
}

const $ = {
	ajax: _ajax
}

export default $;