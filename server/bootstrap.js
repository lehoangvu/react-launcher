var dotenv = require('dotenv');

var ENV_STR = process.env.ENV_STR;
var loadApp = (app_name) => {
    switch(app_name.trim()) {
        case 'api':
            require('./api');
        break;
        case 'cron':
            require('./cron');
        break;
        case 'server':
            // require('./server');
            require('./server');
        break;
        default:
        return;
    }
}

ENV_STR.split(',').forEach((item)=>{
    var keyValue = item.split(':');
    switch(keyValue[0]) {
        case 'env_file':
            dotenv.config({path:'./'+keyValue[1]});
        break;
        case 'app_type':
            loadApp(keyValue[1]);
        break;
    }
});
 