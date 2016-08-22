var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Server Raspberry PI' });
});

router.get('/Google', function(req, res, next) {
    res.writeHead(301, {'Location': 'https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://porta.digitaldesk.com.br/Login/CompletarGoogle&response_type=token&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com'});
	res.end();
	console.log('/redirecionar');
});

router.get('/CompletarGoogle', function(req, res, next) {
	console.log('access_token - ' + req.query.access_token);
	console.log('req - ' + JSON.stringify(req));
    res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br/?access_token=' + req.query.access_token});
	res.end();
});

module.exports = router;