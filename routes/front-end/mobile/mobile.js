var express = require('express');
var Mobile = express.Router();
var Mongo = require("./../../classes/mongo.js");

Mobile.get('/', function(req, res){
    console.log(req);
    var nomeGoogle = req.query.name;
    Mongo.find({name: nomeGoogle}, 'user', res, function(res, userObj){ 
        res.type('text/json');
        res.send(userObj);
    });
});

Mobile.post('/', function(req, res){
    var tokenGoogle = req.query.token; 
    var insertObj = {name: req.query.name, role: "", status: "A", devices: [{status: "I", name: "touch", value: "", timeRange: ""}, {status: "A", name: "mobile", value: tokenGoogle, timeRange: ""}, {status: "I", name: "nfc", value: "", timeRange: ""}]};
    Mongo.insert(insertObj, 'user', function(){}) ;
    res.sendStatus(200);
});

Mobile.put('/', function(req, res){
    var tokenGoogle = req.query.token; 
    Mongo.update({name: req.query.name}, 'user', req, function(userObj, req){
        userObj.device[1].value = tokenGoogle;
        return userObj;
    });
    res.sendStatus(200);
});

module.exports = Mobile;