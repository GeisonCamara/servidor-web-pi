var express = require('express');
var Mobile = express.Router();
var Mongo = require("./../../classes/mongo.js");
var request = require('request');
var users = require("./../../config/users.js");
var logger = require("winston");
var log = require("./../../config/log.js");


Mobile.post('/usuario', function(req, res){
    var password = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 40; i++ )
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    var key = req.query.key;
    var name = req.query.user;
    var achou = false;
    for(var i=0; i < users.length; i++){
        if(key==users[i].password && name==users[i].name){
            achou = true;
            Mongo.find({name: name}, 'user', res, function(res, userObj){
                var token = userObj[0].devices[1].value;
                logger.info(name + " logou no aplicativo!");
                conferirToken(req, res, token, password, name);
            },function(req2, res2){
                cadastrarUsuario(req, res, password, name);
            });
            break;
        }
    }

    if (!achou) {
            res.send({status: false});
        }
});

//método para diferenciar as ações de acordo com o aparelho usado
/*Mobile.post('/google/ios', function(req, res){
	var access_token = req.query.token;
	acessarToken(req, res, access_token);
});

Mobile.post('/google/android', function(req, res){*/
Mobile.post('/google', function(req, res){
    var tokenGoogle = req.query.token;
    var headers = {'Content-Type': 'x-www-form-urlencoded'};
    var body = {grant_type: 'authorization_code',
                client_id: '489399558653-rde58r2h6o8tnaddho7lathv2o135l7m.apps.googleusercontent.com',
                client_secret: 'QlGfYitSzTxQv0PlhWXer8xh',
                redirect_uri: '',
                code: tokenGoogle};

   logger.info('Código pra pegar o token - '+ tokenGoogle);
    request.post({
        url:"https://www.googleapis.com/oauth2/v4/token",
        headers:headers,
        form:body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parse = JSON.parse(body);
            var access_token = parse.access_token;
            acessarToken(req, res, access_token);
        }
        else{
            logger.warn('Failha na primeira requisição!');
            res.send({status: false}); 
        }
    });
});

function acessarToken(req, res, access_token){
    request({
        uri:"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token,
        method:'GET'},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var parse = JSON.parse(body);
                var name = parse.name;
                var domain = parse.hd;
                logger.info('Nome: ' + name + ' - Dominio: ' + domain);
                verificarGrupo(req, res, access_token, name, domain);
            }
            else{
                logger.warn('Falha na segunda requisição!');
                res.send({status: false});
            }
        }
    )
}

function verificarGrupo(req, res, access_token, name, domain){
    if (domain == "digitaldesk.com.br") {
        consultarUsuario(req, res, access_token, name);
        logger.info('e-mail valido!');
    }    
    else {
        logger.warn('email inválido!');
        res.send({status: false});
    }
}

function consultarUsuario(req, res, access_token, name){
    Mongo.find({name: name}, 'user', res, function(res, userObj){
       logger.info('Usuário encontrado!');
        var token = userObj[0].devices[1].value;
        conferirToken(req, res, token, access_token, name);
    },function(req2, res2){
       logger.warn('Usuário não encontrado!');
        cadastrarUsuario(req, res, access_token, name);
    });
}

function cadastrarUsuario(req, res, access_token, name){
    var insertObj = {name: name, role: "", status: "A", devices: [{status: "A", name: "web", value: "", timeRange: ""}, {status: "A", name: "mobile", value: access_token, timeRange: ""}, {status: "I", name: "nfc", value: "", timeRange: ""}]};    
    Mongo.insert(insertObj, 'user', function(success){
        if (success)
            res.send({status: true, token: access_token});
        else res.send({status: false});
    });
   logger.info('Usuário cadastrado.');
}

function conferirToken(req, res, token, access_token, name){
    if(access_token==token){
        res.send({status: true, token: access_token});
       logger.info('Token válido!');
    }
    else {
        atualizarToken(req, res, access_token, name);
    }
}

function atualizarToken(req, res, access_token, name){
    var name = {name: name};
    var action = 'mobile';
    Mongo.update(name, access_token, action, function (success) {
        if (success)
            res.send({status: true, token: access_token});
        else res.send({status: false});
    });
}

module.exports = Mobile;