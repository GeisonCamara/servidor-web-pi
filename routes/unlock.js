var express = require('express');
var router = express.Router();
var lock = require('./../actions/lock.js');
var sound = require('./../actions/sound.js');
var log = require("./../config/log.js");
var utils = require("./../utils")

router.get('/', function(req, res, next) {
    if (req.query.key == "DD2016TRNEE") {
        lock(req.query.device, req.query.user);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

router.post('/slack', function(req, res, next) {
    var token = req.query.key;

    var tokenSlack = utils.passwordSlack[token];
    if (!tokenSlack) {
        res.send({ status: false });
    } else if (!tokenSlack.date.getTime() + (30 * 1000) > new Date.getTime()) {
        res.send({ status: false });
        utils.passwordSlack[token] = undefined;
    } else {
        lock("web", "Slack");
        res.send({ status: true });
        utils.passwordSlack[token] = undefined;
    }
});

module.exports = router;