var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo/mongo.js');

router.get('/', function(req, res, next) {
    res.render('insert', { title: 'Server Raspberry PI' });
});

router.post('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        var insertObj = {name: req.query.user, key: req.query.key, mobile: req.query.mobile, nfc: req.query.nfc, status: "A"};
        mongo.insert(insertObj, 'user', function(){});
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;