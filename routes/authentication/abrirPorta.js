var express = require('express');
var token = express.Router();
var Mongo = require("./../../classes/mongo.js");
var lock = require('./../../actions/lock.js');

token.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    Mongo.find({devices: { $elemMatch: { value: tokenGoogle } }}, 'user', res, function(res, userObj){
    	console.log('value - ' + JSON.stringify(userObj[0].name));
    	lock('mobile', userObj[0].name);
    	res.send({status: true});
    },function(req, res){
        res.send({status: false});
    });
});

module.exports = token;