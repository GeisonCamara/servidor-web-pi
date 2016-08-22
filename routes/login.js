var express = require('express');
var router = express.Router();
var url = require('url');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Server Raspberry PI' });
});

router.get('/Google', function(req, res, next) {
    res.writeHead(301, {'Location': 'https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://porta.digitaldesk.com.br/Login/CompletarGoogle&response_type=code&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com'});
	res.end();
});

router.get('/CompletarGoogle', function(req, res, next) {
	//var url_parts = url.parse(req.url, true).query;
	//var query = url_parts.query;
	//var Url = req.url;

	//console.log('URL - ' + JSON.stringify(url_parts));
	/*console.log('access_token - ' + query.access_token);
	console.log('req - ' + JSON.stringify(query));*/
	var requrl = url.format({
	    protocol: req.protocol,
	    host: req.get('host'),
	    pathname: req.originalUrl,
	});
	console.log(requrl);
    res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br'});
	res.end();
});

module.exports = router;