var qna = require('../Api/qna');
var user = require('../Api/user');

module.exports = function(app) {
    app.route('/api/qna/create').post(function(req, res) {
        if (typeof req.headers['x-customer-token'] !== 'undefined') {
            user.getByToken(req.headers['x-customer-token'], ['_id']).then(function(user) {
            	console.log(req.body);
                req.checkBody('title', 'Invalid title').notEmpty().len(10, 80);
                req.checkBody('content', 'Invalid content').notEmpty().len(100, 1000);

                req.getValidationResult().then(function(result) {
                    if (!result.isEmpty()) {
                    	console.log(result.array());
                        res.status(400).send({error: 'Data invalid'});
                        return;
                    } else {
                    	req.sanitizeBody('title').trim();
                    	req.sanitizeBody('title').escape();

                    	req.sanitizeBody('tag').trim();
                    	req.sanitizeBody('tag').escape();

                    	var tags = typeof req.body.tags === 'undefined' ? [] : req.body.tags.split(',');

		                var model = {
		                    'title': req.body.title,
		                    'content': req.body.content,
		                    'tags': tags,
		                    'uid': user._id
		                };

		                res.send(model);
		                // qna.add({
		                //     title: 'Title ' + from,
		                //     create_at: new Date().getTime(),
		                //     uid: 12412
		                // }).then(function(snap) {
		                //     console.log(snap.title);
		                // }).catch(function(err) {
		                //     console.log(err);
		                // });
                    }
                });

            }).catch(function(err) {
                res.status(400).send(err);
            })
        } else {
            res.status(400).send({
                error: 'Something went wrong!'
            });
        }
    });

    app.route('/api/qna/search').get(function(req, res) {
        var query = {
            q: req.query || '',
            sort: req.query.sort || 'newest',
            page: req.page || 1
        };
        qna.search(req.query).then(function(results) {
            res.send(results).bind(res);
        }).catch(function(err) {
            res.status(400).send(err).bind(res);
        });
    });

}