var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Server Raspberry PI', demo: 'teste' });
});

module.exports = router;