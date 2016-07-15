var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo/mongo.js');

router.put('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        mongo.update({name: req.query.user}, req, function(userObj, req){
            userObj.name = req.query.user;
            userObj.key = req.query.key;
            userObj.nfc = req.query.nfc;
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