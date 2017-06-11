"use strict";
var request = require('request');
var mongo = require('../db/mongo');
var apicache = require('apicache');
var RegionData = require('../data-region.json');
var cache = apicache.middleware;

module.exports = function (app) {
    app.route('/api/country').get(function (req, res) {
        res.send(RegionData);
    });
}
