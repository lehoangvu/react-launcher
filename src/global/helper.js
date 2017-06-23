import axios from 'axios';
function fetch(url, method = 'get', token = null, data = {}) {
	let headers = {};
	if(token) headers['x-customer-token'] = token;
	const options = {
		url,
		method: method,
		baseURL: config.API_URL,
		data: {
			...data
		},
		headers
	};
	return axios(options);
}
export default {
	fetch,
	removeSigh: (str) => {
	    str= str.toLowerCase();
	    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	    str= str.replace(/đ/g,"d");
	    return str;
	},
	slugify:  (str) => {
	    str= str.toLowerCase();
	    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	    str= str.replace(/đ/g,"d");
	    return str.toString().toLowerCase()
	    .replace(/\s+/g, '-')           // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
	    .replace(/^-+/, '')             // Trim - from start of text
	    .replace(/-+$/, '');            // Trim - from end of text
	},
	getTagIcon: (text, max = 1) => {
		let listIcon = [
			{
				name: 'android',
				alias: 'android',
				filename: 'android.svg',
				rank: 1
			},
			{
				name: 'angular',
				alias: 'angular',
				filename: 'angular.svg',
				rank: 1
			},
			{
				name: 'bootstrap',
				alias: 'bootstrap',
				filename: 'bootstrap.svg',
				rank: 1
			},
			{
				name: 'database',
				alias: 'database',
				filename: 'database.svg',
				rank: 1
			},
			{
				name: 'firebase',
				alias: 'firebase',
				filename: 'firebase.svg',
				rank: 1
			},
			{
				name: 'html',
				alias: 'html',
				filename: 'html.svg',
				rank: 3
			},
			{
				name: 'ios',
				alias: 'ios',
				filename: 'ios.svg',
				rank: 1
			},
			{
				name: 'java',
				alias: 'java',
				filename: 'java.svg',
				rank: 1
			},
			{
				name: 'js',
				alias: 'javascript',
				filename: 'js.svg',
				rank: 2
			},
			{
				name: 'javascript',
				alias: 'javascript',
				filename: 'js.svg',
				rank: 2
			},
			{
				name: 'mysql',
				alias: 'mysql',
				filename: 'mysql.svg',
				rank: 1
			},
			{
				name: 'nodejs',
				alias: 'nodejs',
				filename: 'nodejs.svg',
				rank: 1
			},
			{
				name: 'php',
				alias: 'php',
				filename: 'php.svg',
				rank: 1
			},
			{
				name: 'react',
				alias: 'react',
				filename: 'react.svg',
				rank: 3
			},
			{
				name: 'sass',
				alias: 'sass',
				filename: 'sass.svg',
				rank: 2
			},
			{
				name: 'wprdpress',
				alias: 'wprdpress',
				filename: 'wprdpress.svg',
				rank: 1
			},
			{
				name: 'codeigniter',
				alias: 'codeigniter',
				filename: 'codeigniter.svg',
				rank: 1
			}, {
				name: 'game',
				alias: 'game',
				filename: 'game.svg',
				rank: 1
			}, {
				name: 'laravel',
				alias: 'laravel',
				filename: 'laravel.svg];',
				rank: 1
			}
		];
		let listResults = [];
		let ignoreList = '';
		listIcon.map((icon, index) => {
			let countWord = text.split(icon.name).length - 1;
			if(countWord > 0 && ignoreList.indexOf(icon.alias) === -1) {
				ignoreList += `-${icon.alias}-`;
				listResults.push({
					...icon,
					fileurl: `/public/img/tags/${icon.filename}`,
					score: countWord + icon.rank
				})
			}
		});

		// sort 
		for(let i = 0; i < listResults.length - 1; i++) {
			for(let j = i; j < listResults.length; j++) {
				let a = {
					...listResults[i]
				};
				let b = {
					...listResults[j]
				};
				if(a.score < b.score) {
					listResults[i] = b;
					listResults[j] = a;
				}
			}
		}

		let finalResult = [];
		if(max > listResults.length) return listResults;
		for(let k = 0; k < max; k++) {
			finalResult.push(listResults[k]);
		}
		return finalResult;
	}
}