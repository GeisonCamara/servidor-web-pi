var express = require('express');
var token = express.Router();
var Mongo = require("./../../classes/mongo.js");

token.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    Mongo.find({device[1].value: tokenGoogle}, 'user', res, function(res, userObj){
        res.redirect("./../unlock?key=DD2016TRNEE&device=mobile&user="+userObj[0].name);
    },function(req, res){
        res.sendStatus(404);
    });
});

module.exports = token;