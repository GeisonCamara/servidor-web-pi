v/*ar express = require('express');
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

module.exports = Senha;*/

var express = require('express');
var Mobile = express.Router();
var Mongo = require("./../../classes/mongo.js");
var requisicao = require('./requisicao.js');

/*Mobile.get('/', function(req, res){
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
});*/

Mobile.post('/', function(req, res){
    var tokenGoogle = req.query.token;

    requisicao.confirmarToken('oauth2/v1/userinfo?access_token=','GET',{tokenGoogle},function(data){
        emailGrupo = '';
        verificarGrupo(req, res, emailGrupo);
    });
}

function verificarGrupo(req, res, emailGrupo){
    if (emailGrupo == "digitaldesk.com.br") {
        consultarUsuario(req, res);
    }    
    else {
        function(req, res){
            res.sendStatus(404);
        };
    }
}

function consultarUsuario(req, res){
    var nomeGoogle = req.query.name;

    Mongo.find({name: nomeGoogle}, 'user', res, function(res, userObj){ 
        conferirToken(req, res, userObj.device[1].value);
    },function(req, res){
        cadastrarUsuario(req, res);
    });
}

function cadastrarUsuario(req, res){
    var tokenGoogle = req.query.token; 
    var insertObj = {name: req.query.name, role: "", status: "A", devices: [{status: "I", name: "touch", value: "", timeRange: ""}, {status: "A", name: "mobile", value: tokenGoogle, timeRange: ""}, {status: "I", name: "nfc", value: "", timeRange: ""}]};
    
    Mongo.insert(insertObj, 'user', function(){}) ;
    res.sendStatus(200);
}

function conferirToken(req, res, token){
    var tokenGoogle = req.query.token; 

    if(tokenGoogle==token){
        res.sendStatus(200);
    }
    else {
        atualizarToken(req, res);
    }
}

function atualizarToken(req, res){
    var tokenGoogle = req.query.token; 

    Mongo.update({name: req.query.name}, 'user', req, function(userObj, req){
        userObj.device[1].value = tokenGoogle;
        return userObj;
    });
    res.sendStatus(200);
}

module.exports = Mobile;