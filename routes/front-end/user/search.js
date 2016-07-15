var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo/mongo.js');

router.get('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        mongo.find({user:req.query.user}, res, function(res, userObj){
            res.sendStatus(200);
        });
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;