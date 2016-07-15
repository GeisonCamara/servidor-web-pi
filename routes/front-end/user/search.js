var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo/mongo.js');

router.get('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        if(req.query.user=='all'){
            mongo.find({}, res, function(res, userObj){
                console.log(userObj);
                res.type("text/json");
                res.send(userObj);
            });
        }
        else {
            mongo.find({name:req.query.user}, res, function(res, userObj){
                console.log(userObj);
                res.type("text/json");
                res.send(userObj);
            });
        }
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;