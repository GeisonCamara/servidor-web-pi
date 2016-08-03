var express = require('express');
var Senha = express.Router();
var Mongo = require("./../../classes/mongo.js");

Senha.get('/', function(req, res){
    console.log(req);
    var token = req.query.token;
    Mongo.find({device[1].value: token}, 'user', res, function(res, userObj){
        if(userObj.length > 0){
            res.redirect("./../unlock?key=DD2016TRNEE&device=mobile&user="+userObj[0].name);
        }
    });
});

module.exports = Senha;