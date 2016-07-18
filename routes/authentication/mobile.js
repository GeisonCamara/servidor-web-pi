var express = require('express');
var Senha = express.Router();
var Mongo = require("./../../classes/mongo/mongo.js");

Senha.get('/', function(req, res){
	console.log(req);
    var key = req.query.key;
    Mongo.find({mobile:key}, 'user', res, function(res, userObj){
      	if(userObj.length > 0){
      		res.redirect("./../unlock?key=DD2016TRNEE&device=mobile&user="+userObj[0].name);
      	}
    });
});

module.exports = Senha;