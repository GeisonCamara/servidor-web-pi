var express = require('express');
var token = express.Router();
var Mongo = require("./../../classes/mongo.js");
var lock = require('./../../actions/lock.js');

token.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    Mongo.find({devices[1].value: tokenGoogle}, 'user', res, function(res, userObj){
    	lock('mobile', req.query.user);
    },function(req, res){
        res.sendStatus(404);
    });
});

module.exports = token;