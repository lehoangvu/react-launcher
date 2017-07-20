var mongo = require('./db/mongo');

var typeBuilder = (_type = 'string', _default = '') => {
    return {
        ignore: false,
        type: _type,
        default: _default
    }
}

var defaultQuestion = {
    "_id": {
        ignore: true,
    },
    "title": typeBuilder(),
    "url": typeBuilder(),
    "content": typeBuilder(),
    "tags": typeBuilder('array', []),
    "uid": {
        ignore: true,
    },
    "create_at": typeBuilder('number', 0),
    "update_at": typeBuilder('number', 0),
    "view": typeBuilder('number', 0),
    "vote": typeBuilder('number', 0),
    "down_vote": typeBuilder('number', 0),
    "reply": typeBuilder('number', 0),
    "type": typeBuilder('string', 'question'),
    "id": typeBuilder()
};

var check = (data) => {
    let change = false;
    Object.keys(defaultQuestion).map(key => {
        if (defaultQuestion[key].ignore) {
            return;
        }
        // check exist data
        if (typeof data[key] === 'undefined') {
            data[key] = defaultQuestion[key].default;
            change = true;
            return;
        }
        // check type
        let type = typeof data[key];
        if (Array.isArray(data[key])) type = 'array';
        if (type !== defaultQuestion[key].type) {
            data[key] = defaultQuestion[key].default;
            change = true;
            return;
        }
    });
    if (!change) {
        return true;
    }
    return data;
}

let questionSkip = 0;
let questionLimit = 1;
let questionTotal = 0;
let questionUpdated = 0;
let questionUpdateFailed = 0;
let questionUpdateIgnored = 0;
var checkQuestion = (skip) => {
    mongo.search('qna', '', {}, questionSkip, questionSkip + questionLimit).then((results) => {
        questionTotal = results.total;
        let nextSkip = false;
        if (questionTotal > skip + 1) {
            nextSkip = skip + questionLimit;
        }
        results.data.map((question) => {
            let pr = [];
            let _data = check(question);
            if (_data !== true) {
                var u = mongo.updateDocument('qna', _data, _data._id.toString()).then((result) => {
                    questionUpdated++;
                }).catch((err) => {
                    questionUpdateFailed++;
                });
                pr.push(u);
            } else {
                questionUpdateIgnored++;
            }
            Promise.all(pr).then(() => {
                if (nextSkip !== false) {
                    questionSkip = nextSkip;
                    migrateQuestion(questionSkip);
                } else {
                    console.log({
                        questionTotal,
                        questionUpdated,
                        questionUpdateFailed,
                        questionUpdateIgnored
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        })
    }).catch((err) => {
        console.log(err);
    })
}



mongo.connect().then(function() {
    console.log('Connect Mongo Success and begin to Migrate!');

    mongo.createCollection('qna', {
        title: "text",
        content: "text",
        tags: "text"
    });
    mongo.createCollection('user');
    mongo.createCollection('user_notice');
    mongo.createCollection('user_react_question');
    mongo.createCollection('user_token');

    // checkQuestion(questionSkip);


}).catch(function(err) {
    console.log(err);
});