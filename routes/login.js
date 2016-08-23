var express = require('express');
var router = express.Router();
var url = require('url');
var Mongo = require("./../classes/mongo.js");
var request = require('request');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Server Raspberry PI' });
});

router.get('/Google', function(req, res, next) {
    res.writeHead(301, {'Location': 'https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://porta.digitaldesk.com.br/Login/CompletarGoogle&response_type=code&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com'});
	res.end();
});

router.get('/CompletarGoogle', function(req, res, next) {
	var url_parts = url.parse(req.url, true).query;

	console.log('code - ' + JSON.stringify(url_parts.code));
    //res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br'});
	//res.end();
});

module.exports = router;