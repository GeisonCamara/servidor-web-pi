var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo.js');
var log = require("./../../../config/log.js");

router.put('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        mongo.update({name: req.query.user}, 'user', req, function(userObj, req){
            userObj.name = req.query.user;
            userObj.devices[0].value = req.query.key;
            userObj.devices[2].value = req.query.nfc;
            userObj.status = req.query.status;
            return userObj;
        });
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;