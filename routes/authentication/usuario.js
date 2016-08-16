var express = require('express');
var mobile = express.Router();
var Mongo = require("./../../classes/mongo.js");
var request = require('request');

mobile.post('/', function(req, res){
	var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var password = Array.apply(null, Array(N)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
    console.log('password - ' + password);
    var key = req.query.key;
    var name = req.query.user;
    if(key=="@digitaldesk1" && user=="admin"){
    	Mongo.find({name: name}, 'user', res, function(res, userObj){
    		var token = userObj[0].devices[1].value;
	        console.log('usuario encontrado');
	        conferirToken(req, res, token, password, name);
	    },function(req2, res2){
	        console.log('usuario não encontrado');
	        cadastrarUsuario(req, res, password, name);
	    });
    }
    else {
        res.send({status: false});
    }
});

module.exports = mobile;
/*function cadastrarUsuario(req, res, password, name){
    var insertObj = {name: name, role: "", status: "A", devices: [{status: "I", name: "touch", value: "", timeRange: ""}, {status: "A", name: "mobile", value: password, timeRange: ""}, {status: "I", name: "nfc", value: "", timeRange: ""}]};    
    Mongo.insert(insertObj, 'user', function(success){
        if (success)
            res.send({status: true, token: password});
        else res.send({status: false});
    });
    console.log('usuario cadastrado');

function conferirToken(req, res, token, password, name){
    if(password==token){
        res.send({status: true, token: password});
        console.log('token correto');
    }
    else {
        atualizarToken(req, res, password, name);
    }
}

function atualizarToken(req, res, password, name){
    var name = {name: name};
    Mongo.update(name, password, function (success) {
        if (success)
            res.send({status: true, token: password});
        else res.send({status: false});
    });
    
}*/