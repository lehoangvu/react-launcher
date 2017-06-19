"use strict";
var request = require('request');
var mongo = require('../db/mongo');
var User = require('../Api/User');
var Updater = require('../Helper/Updater');
var User = require('../Api/user');
var apicache = require('apicache');
var cache = apicache.middleware;

function checkLogin(req, res, next) {
    var token = req.headers['x-customer-token'];
    if(typeof token === 'undefined') {
        res.status(400).send({
            error: "Login is required"
        });
    }

    User.getByToken(token, ["_id"]).then((user) => {
        req.uid = user._id;
        next(); 
    }).catch((err) => {
        res.status(400).send({
            error: "Token invalid!"
        });   
    });
}

module.exports = function (app) {
    app.route('/api/survey/salary/company').get(function (req, res) {
        var q = req.query.q || '';
        var page = req.query.page || 1;
        var limit = 10;
        var skip = (page - 1) * limit;
        // collectionName, text, sorts, skip, limit, type, question_id)
        // mongo.search('survey_salary_company', q, {create_at: -1}, skip, limit, null, false).then(function (results) {
        //     res.send(results);
        // }).catch(function (err) {
        //     res.status(400).send(err);
        // });
        var query = mongo.getCollection('survey_salary_company').find({name: new RegExp(q, 'i')});
        query.count((err, count) => {
            query.sort({create_at: -1})
            .skip(skip)
            .limit(limit)
            .toArray((err, results) => {
                var data = results.map((item) => {
                    return {
                        name: item.name
                    }
                });
                res.send({
                    limit: limit,
                    page: page,
                    total: count,
                    data: data
                });
            })
        });
    });
    app.route('/api/survey/salary/company').put(checkLogin, function (req, res) {
        var companyData = {
            name: req.body.name,
            type: req.body.type,
            country: req.body.country,
            region: req.body.region,
            size: req.body.size,
            language: req.body.language,
            uid: req.uid
        };

        mongo.addDocument('survey_salary_company', companyData).then(() => {
            res.send({
                success: true
            });
        }).catch((err) => {
            res.status(400).send({
                error: "Something went wrong"
            });
        });
    });

    app.route('/api/survey/salary/worker').put(checkLogin, function (req, res) {
        var workerData = {
            position: req.body.position,
            company: req.body.company,
            gender: ['male', 'female'].indexOf(req.body.gender) !== -1 ? req.body.gender : 'undefined',
            age: req.body.age,
            salary: req.body.salary,
            uid: req.uid
        };

        mongo.addDocument('survey_salary_worker', workerData).then(() => {
            res.send({
                success: true
            });
        }).catch((err) => {
            res.status(400).send({
                error: "Something went wrong"
            });
        });
    });
}