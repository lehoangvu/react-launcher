var Helper = require('./../Helper');
var mongo = require('./../db/mongo');

var qna = {
    search: function(query) {
        var q = typeof query.q !== 'undefined' ? query.q : '';
        var sort = typeof query.sort !== 'undefined' ? query.sort : 'newest'; 
        var page = typeof query.page !== 'undefined' ? query.page : 1; 
        var limit = 10;

        db.messages.find({$text: {$search: "cat"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})

        return resolve({
            data: content.hits,
            total: content.nbHits,
            pages: content.nbPages,
            current_page: content.page,
            limit: content.hitsPerPage
        });
    },
    add: function(data) {
        var postData = {
            'title': data.title,
            'create_at': data.create_at,
            'update_at': data.create_at,
            'view': Helper.random(0, 300),
            'vote': Helper.random(1, 125),
            'down_vote': Helper.random(1, 125),
            'reply': Helper.random(0, 20),
            'uid': data.uid
        };
        return new Promise(function(resolve, reject) {
            mongo.addDocument('qna', postData).then(function(snapshot) {
                postData._id = snapshot.insertedIds;
                return resolve(postData);
            }).catch(function() {
                return reject({
                    error: 'Something whent wrong'
                });
            });
        });  
    },
}

module.exports = qna;