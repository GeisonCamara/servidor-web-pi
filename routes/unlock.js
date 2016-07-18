var express = require('express');
var router = express.Router();
var lock = require('./../actions/lock.js');
var sound = require('./../actions/sound.js');
var gpio = require('rpi-gpio');

router.get('/', function(req, res, next) {
    if(req.query.key=="DD2016TRNEE"){
        lock(req.query.device, req.query.user);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;