var express = require('express');
var Mobile = express.Router();
var Mongo = require("./../../classes/mongo.js");
//var requisicao = require('./../../classes/requisicao.js');
var request = require('request');

Mobile.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    var headers = {'Content-Type': 'x-www-form-urlencoded'};
    var body = {grant_type: 'authorization_code',
                client_id: '489399558653-rde58r2h6o8tnaddho7lathv2o135l7m.apps.googleusercontent.com',
                client_secret: 'QlGfYitSzTxQv0PlhWXer8xh',
                redirect_uri: '',
                code: tokenGoogle};

    console.log(tokenGoogle);
    request.post({
        url:"https://www.googleapis.com/oauth2/v4/token",
        headers:headers,
        form:body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var accessToken = body.access_token;
            console.log(body);
            console.log( 'okay - token: ' + accessToken);
            acessarToken(req, res, accessToken);
        }
        else{
            console.log('fail na primeira requisição'); 
        }
    });
});

function acessarToken(req, res, accessToken){
    request({
        uri:"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken,
        method:'GET'},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var name = body.name;
                var domain = body.hd;
                console.log('nome - ' + name + 'dominio - ' + domain);
                verificarGrupo(req, res, accessToken, name, domain);
            }
            else{
                console.log('fail na segunda requisição');
            }
        }
    )
}

function verificarGrupo(req, res, accessToken, name, domain){
    if (domain == "digitaldesk.com.br") {
        consultarUsuario(req, res, accessToken, name);
        console.log('e-mail valido');
    }    
    else {
        /*res.type('json');
        res.send(var empty = {});*/
        console.log('email inválido');
        res.sendStatus(404);
    }
}

function consultarUsuario(req, res, accessToken, name){
    Mongo.find({name: name}, 'user', res, function(res, userObj){ 
        conferirToken(req, res, userObj.devices[1].value, accessToken, name);
        console.log('usuario encontrado');
    },function(req, res){
        cadastrarUsuario(req, res, accessToken, name);
        console.log('usuario não encontrado');
    });
}

function cadastrarUsuario(req, res, accessToken, name){
    var insertObj = {name: name, role: "", status: "A", devices: [{status: "I", name: "touch", value: "", timeRange: ""}, {status: "A", name: "mobile", value: accessToken, timeRange: ""}, {status: "I", name: "nfc", value: "", timeRange: ""}]};    
    Mongo.insert(insertObj, 'user', function(){}) ;
    res.type('json');
    res.send(accessToken);
    console.log('usuario cadastrado');
}

function conferirToken(req, res, token, accessToken, name){
    if(accessToken==token){
        res.type('json');
        res.send(accessToken);
        console.log('token okay');
    }
    else {
        atualizarToken(req, res, accessToken, name);
    }
}

function atualizarToken(req, res, accessToken, name){
    Mongo.update({name: name}, 'user', req, function(userObj, req){
        userObj.devices[1].value = accessToken;
        return userObj;
    });
    console.log('token atualizado');
    res.type('json');
    res.send(accessToken);
}

module.exports = Mobile;