module.exports = {
	random: function(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	},
	slugify:  function removeSigh(str){
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
	alphabetic: require('./alphabetic')
}