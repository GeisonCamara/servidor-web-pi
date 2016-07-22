var express = require('express');
var router = express.Router();
var config = require('./../classes/config.js');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Server Raspberry PI' });
});

router.post('/', function(){
    
});

config.set('campainha:status', 1);
config.set('campainha:toque', 'dingdong.wav');
config.set('btnInterno', 1);
config.set('nfc', 0);
config.set('camera', 0);
config.set('mobile', 0);
config.set('microfone', 0);
config.set('touchScreen', 0);
config.set('historicInterface', 0);
config.set('userInterface', 0);

module.exports = router;