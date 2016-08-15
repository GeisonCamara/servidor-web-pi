var express = require('express');
var token = express.Router();
var Mongo = require("./../../classes/mongo.js");
var lock = require('./../../actions/lock.js');

token.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    Mongo.find({devices: { $elemMatch: { value: tokenGoogle } }}, 'user', res, function(res, userObj){
    	lock('mobile', userObj[0].name);
    	res.send({status: true});
    },function(req2, res2){
        res.send({status: false});
        console.log('token fail');
    });
});

module.exports = token;