var qna = require('../Api/qna');
var user = require('../Api/user');
var apicache = require('apicache');
var cache = apicache.middleware;

module.exports = function(app) {
    app.route('/api/qna/create').post(function(req, res) {
        if (typeof req.headers['x-customer-token'] !== 'undefined') {
            user.getByToken(req.headers['x-customer-token'], ['_id']).then(function(user) {

                req.checkBody('title', 'Invalid title').notEmpty().len(10, 80);
                req.checkBody('content', 'Invalid content').notEmpty().len(100, 1000);

                req.getValidationResult().then(function(result) {
                    if (!result.isEmpty()) {
                        res.status(400).send({error: 'Data invalid'});
                        return;
                    } else {
                    	req.sanitizeBody('title').trim();

                    	req.sanitizeBody('tag').trim();

                    	var tags = typeof req.body.tags === 'undefined' ? [] : req.body.tags.split(',');
                    	if(tags.length > 0) {
                    		tags.forEach(function(tag, index) {
                    			tags[index] = tag.trim();
                    		});
                    	}

		                var model = {
		                    'title': req.body.title,
                            'url': require('../Helper').slugify(req.body.title),
		                    'content': req.body.content,
		                    'tags': tags,
		                    'uid': user._id
		                };

		                // res.send(model);
		                qna.add(model).then(function(snap) {
		                    res.send(snap);
		                }).catch(function(err) {
		                    res.status(400).send(err);
		                });
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

    app.route('/api/qna/questions').get(function(req, res) {
        var id = req.query.id;
        if(!id) {
            res.status(400).send({
                error: 'Require id'
            });
        }
        qna.get(id).then(function(results) {
            res.send(results);
        }).catch(function(err) {
            res.status(400).send(err);
        });
    });

}