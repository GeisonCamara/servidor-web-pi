var express = require('express');
var router = express.Router();
//var mongo = require('./../../../classes/mongo/mongo.js');

router.get('/', function(req, res, next) {
    res.render('historic', { title: 'Server Raspberry PI' });
});

module.exports = router;