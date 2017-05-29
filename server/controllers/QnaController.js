"use strict";
var request = require('request');
var qna = require('../Api/qna');
var mongo = require('../db/mongo');
var Updater = require('../Helper/Updater');
var User = require('../Api/user');
var apicache = require('apicache');
var cache = apicache.middleware;

function checkToken(req) {
    return typeof req.headers['x-customer-token'] !== 'undefined';
}

module.exports = function (app) {
    app.route('/api/qna/create').put(function (req, res) {
        if (typeof req.headers['x-customer-token'] !== 'undefined') {
            User.getByToken(req.headers['x-customer-token'], ['_id']).then(function (user) {

                req.checkBody('title', 'Invalid title').notEmpty().len(10, 80);
                req.checkBody('content', 'Invalid content').notEmpty().len(60, 2000);

                req.getValidationResult().then(function (result) {
                    if (!result.isEmpty()) {
                        res.status(400).send({ error: 'Data invalid' });
                        return;
                    } else {
                        req.sanitizeBody('title').trim();

                        req.sanitizeBody('tag').trim();

                        var tags = typeof req.body.tags === 'undefined' ? [] : req.body.tags.split(',');
                        if (tags.length > 0) {
                            tags.forEach(function (tag, index) {
                                tags[index] = tag.trim();
                            });
                        }

                        var model = {
                            'title': req.body.title,
                            'url': require('../Helper').slugify(req.body.title),
                            'content': req.body.content,
                            'tags': tags,
                            'uid': user._id,
                            'type': 'question'
                        };

                        // res.send(model);
                        qna.add(model).then(function (snap) {
                            res.send(snap);
                        }).catch(function (err) {
                            res.status(400).send(err);
                        });
                    }
                });

            }).catch(function (err) {
                res.status(400).send(err);
            })
        } else {
            res.status(400).send({
                error: 'Require login'
            });
        }
    });

    app.route('/api/qna/questions/:id/answer').put(function (req, res) {
        if (typeof req.headers['x-customer-token'] !== 'undefined') {
            req.checkBody('content', 'Invalid content').notEmpty().len(60, 2000);
            req.getValidationResult().then(function (result) {
                if (!result.isEmpty()) {
                    res.status(400).send({ error: 'Data invalid' });
                    return;
                } else {

                    User.getByToken(req.headers['x-customer-token'], ['_id', 'fullname', 'nickname', 'image']).then(function (user) {
                        let questionId = req.params.id;
                        qna.get(questionId).then(function (question) {
                            var model = {
                                'title': '',
                                'url': '',
                                'content': req.body.content,
                                'tags': [],
                                'type': 'answer',
                                'question_id': question._id,
                                'uid': user._id
                            };

                            // res.send(model);
                            qna.add(model).then(function (snap) {
                                snap.user = user;
                                Updater.createCronUpdateAnswer(question._id);
                                res.send(snap);
                            }).catch(function (err) {
                                res.status(400).send(err);
                            });
                        }).catch(function (err) {
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        res.status(400).send(err);
                    })

                }
            });


        } else {
            res.status(400).send({
                error: 'Require login'
            });
        }
    });

    app.route('/api/qna/questions/:id/vote').post(function (req, res) {
        if (checkToken(req)) {
            // check data
            var vote = req.body.vote;
            if (typeof vote !== 'undefined' && ['1', '-1'].indexOf(vote.toString()) !== -1) {
                vote = parseInt(vote);
                User.getByToken(req.headers['x-customer-token'], ['_id']).then((user) => {
                    let questionID = req.params.id;
                    qna.get(questionID).then((question) => {
                        // check user is owner
                        if (user._id.toString() === question.uid.toString()) {
                            res.status(400).send({
                                error: 'You are owner'
                            });
                        } else {
                            // check user has vote
                            mongo.findOne('user_react_question', { question_id: question._id, uid: user._id, action: 'vote' })
                                .then((result) => {
                                    console.log(result);
                                    if (!result) {
                                        mongo.addDocument('user_react_question', {
                                            uid: user._id,
                                            action: 'vote',
                                            value: vote,
                                            question_id: question._id
                                        }).then(() => {
                                            Updater.createCronUpdateVote(question._id);
                                            res.send({
                                                type: 'new',
                                                vote: vote
                                            });
                                        }).catch((err) => {
                                            res.status(400).send({
                                                error: err
                                            });
                                        });
                                    } else {
                                        if (result.value === vote) {
                                            res.status(400).send({
                                                error: 'You voted'
                                            });
                                        } else {
                                            mongo.updateDocument('user_react_question', { $set: { value: vote } }, result._id).then(() => {
                                                Updater.createCronUpdateVote(question._id);
                                                res.send({
                                                    type: 'update',
                                                    vote: vote
                                                });
                                            }).catch((err) => {
                                                res.status(400).send({
                                                    error: 'Something went wrong'
                                                });
                                            });
                                        }
                                    }
                                }).catch((err) => {
                                    res.status(400).send(err);
                                });
                        }

                    }).catch((err) => {
                        res.status(400).send(err);
                    });
                }).catch((err) => {
                    res.status(400).send(err);
                })
            } else {
                res.status(400).send({
                    error: 'Data invalid'
                });
            }
            //     // if()
        } else {
            res.status(400).send({
                error: 'Require login'
            });
        }
    });

    app.route('/api/qna/search').get(function (req, res) {
        var query = {
            q: req.query || '',
            sort: req.query.sort || 'newest',
            page: req.page || 1
        };
        qna.search(req.query).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });

    app.route('/api/qna/questions/:id').get(function (req, res) {
        let id = req.params.id;
        var token = null;
        if (typeof req.headers['x-customer-token'] !== 'undefined') {
            token = req.headers['x-customer-token'];
        }
        if (!id) {
            res.status(400).send({
                error: 'Require id'
            });
        }
        qna.get(id).then(function (question) {
            // get user and vote
            var pr = User.get(question.uid, ['fullname', 'nickname', 'image']);
            pr.then((_user) => {
                question.user = _user;

                // add view record
                User.getByToken(token, ['_id']).then((__user) => {
                    if (__user._id.toString() !== question.uid.toString()) {
                        var viewData = {
                            question_id: question._id,
                            uid: __user._id,
                            action: 'view',
                            value: 1
                        };
                        mongo.countv2('user_react_question', viewData).then((count) => {
                            if (count === 0) {
                                mongo.addDocument('user_react_question', viewData);
                                Updater.createCronUpdateView(question._id);
                                // var createCronReq = {
                                //     url: 'http://localhost:5200/update',
                                //     method: 'POST',
                                //     form: {
                                //         action: 'view',
                                //         id: question._id.toString()
                                //     },
                                //     headers: {
                                //         'Content-Type': 'application/x-www-form-urlencoded'
                                //     }
                                // };
                                // request(createCronReq);
                            }
                        });
                    }
                }).catch((err) => {
                    // no track result
                });

                //get vote data
                qna.getVote(question._id, token).then((vote) => {
                    if (!vote) {
                        question.voted = false;
                        question.down_voted = false;
                    } else {
                        question.voted = (parseInt(vote.value) === 1);
                        question.down_voted = (parseInt(vote.value) === -1);
                    }

                    // get answer data
                    var ansQuery = {
                        q: '',
                        sort: 'oldest',
                        page: 1,
                        question_id: question._id,
                        type: 'answer'
                    };
                    qna.search(ansQuery).then(function (answers) {
                        //update vote for every answer
                        var getVoteAnswerPrs = [];

                        answers.data.forEach((item) => {
                            var pr = qna.getVote(item._id, token).then((vote) => {
                                if (!vote) {
                                    item.voted = false;
                                    item.down_voted = false;
                                } else {
                                    item.voted = (parseInt(vote.value) === 1);
                                    item.down_voted = (parseInt(vote.value) === -1);
                                }
                            });
                            getVoteAnswerPrs.push(pr);
                        });

                        question.answers = answers; // sure about question has answers data
                        Promise.all(getVoteAnswerPrs).then(() => {
                            question.answers = answers;
                            res.send(question);
                        }).catch((err) => {
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        res.status(400).send(err);
                    });
                }).catch((err) => {
                    res.status(400).send({
                        error: 'Something went wrong!'
                    })
                });
            });
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });
    app.route('/api/qna/questions/:id').post(function (req, res) {
        let id = req.params.id;
        if (!id) {
            res.status(400).send({
                error: 'Require id'
            });
        }
        if (typeof req.headers['x-customer-token'] !== 'undefined') {
            User.getByToken(req.headers['x-customer-token'], ['_id']).then(function (user) {
                
                if(req.body.type === 'question') {
                    req.checkBody('title', 'Invalid title').notEmpty().len(10, 80);
                }
                req.checkBody('content', 'Invalid content').notEmpty().len(60, 2000);

                req.getValidationResult().then(function (result) {
                    if (!result.isEmpty()) {
                        res.status(400).send({ error: 'Data invalid' });
                        return;
                    } else {
                        req.sanitizeBody('title').trim();
                        req.sanitizeBody('tag').trim();

                        var tags = typeof req.body.tags === 'undefined' ? [] : req.body.tags.split(',');
                        if (tags.length > 0) {
                            tags.forEach(function (tag, index) {
                                tags[index] = tag.trim();
                            });
                        }

                        var model = {
                            'id': id,
                            'title': req.body.title,
                            'content': req.body.content,
                            'tags': tags,
                            'uid': user._id
                        };

                        // res.send(model);
                        qna.update(model).then(function (snap) {
                            res.send(snap);
                        }).catch(function (err) {
                            res.status(400).send(err);
                        });
                    }
                });

            }).catch(function (err) {
                res.status(400).send({
                    error: 'User invalid'
                });
            });
        } else {
            res.status(400).send({
                error: 'Require login'
            });
        }
    });
}