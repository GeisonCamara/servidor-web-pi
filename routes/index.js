var express = require('express');
var router = express.Router();
var lock = require('./../actions/lock.js');
var sound = require('./../actions/sound.js');
var config = require('./../classes/config.js');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Server Raspberry PI' });
});

var Gpio = require('onoff').Gpio,
    button = new Gpio(21, 'in', 'falling'),
    dingdong = new Gpio(19, 'in', 'falling'),
    vcc = new Gpio(26, 'out'),
    rele = new Gpio(16, 'out');

vcc.writeSync(1);
rele.writeSync(1);


var nconf = require('nconf');
var configuracoes = {campainhaStatus:1,
                    toque:"dingdong.wav",
                    nfc:0,
                    camera:0,
                    btnInterno:1,
                    mobile:1,
                    microfone:0,
                    touch:0};

nconf.argv()
    .env()
    .file({ file: 'data.json' });

nconf.set('campainha:status', configuracoes.campainhaStatus);
nconf.set('campainha:toque', configuracoes.toque);
nconf.set('nfc', configuracoes.nfc);
nconf.set('camera', configuracoes.camera);
nconf.set('btnInterno', configuracoes.btnInterno);
nconf.set('mobile', configuracoes.mobile);
nconf.set('microfone', configuracoes.microfone);
nconf.set('touch', configuracoes.touch);
            
console.log('status: ' + nconf.get('campainhaStatus'));
console.log('toque: ' + nconf.get('toque'));
console.log('nfc: ' + nconf.get('nfc'));
console.log('camera: ' + nconf.get('camera'));
console.log('btnInterno: ' + nconf.get('btnInterno'));
console.log('mobile: ' + nconf.get('mobile'));
console.log('microfone: ' + nconf.get('microfone'));
console.log('touch: ' + nconf.get('touch'));


nconf.save(function (err) {
    //fs.readFile('data.json', function (err, data) {
          //console.dir(JSON.parse(data.toString()))
    //});
});



console.log(nconf.get('btnInterno'));
if(nconf.get('btnInterno')==1){
    button.watch(function(err, value){
        if (err) {
            throw err;
        }
        if(value==1){
            lock('buttonOut', 'Exit button');
        }
    });
}

if(nconf.get('campainha:status')==1){
    dingdong.watch(function(err, value){
        if (err) {
            throw err;
        }
        if(value==1){
            sound();
        }
    });
}

module.exports = router;
