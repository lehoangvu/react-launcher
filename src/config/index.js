export default  process.env.NODE_ENV === 'development' ? {
	FB_APP_ID: '580525262157720',
	GG_APP_ID: '60036624360-59ceaveq0votucv9inc7fvn2u70c6cg8.apps.googleusercontent.com',
	API_URL : 'http://localhost:5100/api/',
	SOCKET_URL : 'http://localhost:5300',
	BASE_URL : 'http://localhost:5000/',
	SEO_DEFAULT_DESCRIPTION: 'Nơi giải đáp thắc mắc dành cho các lập trình viên chuyên nghiệp và đam mê',
	SEO_DEFAULT_TITLE: 'QnA',
} : {
	API_URL : 'https://hoi-dap-api.herokuapp.com/api/',
	SOCKET_URL : 'https://hoi-dap-socket.herokuapp.com/',
	BASE_URL : 'https://hoi-dap.herokuapp.com/',
	FB_APP_ID: '580525262157720',
	GG_APP_ID: '60036624360-df9nsn10arksnda4bms1qic3n2bm5q91.apps.googleusercontent.com',
	SEO_DEFAULT_DESCRIPTION: 'Nơi giải đáp thắc mắc dành cho các lập trình viên chuyên nghiệp và đam mê',
	SEO_DEFAULT_TITLE: 'QnA',
}
