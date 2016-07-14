var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
    res.render('index', { title: 'Raspberry PI' });
});

router.get('/historic', function(req, res, next) {
    res.render('index', { title: 'Raspberry PI' });
});

module.exports = router;