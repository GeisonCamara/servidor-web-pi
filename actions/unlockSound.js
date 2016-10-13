module.exports = function(){
    var unlockSound = require('node-aplay');
    var config = require('./../classes/config');
    var music = new unlockSound('/home/pi/node/trava/dev/servidor-web-pi/media/' + config.get('unlock:toque'));

    music.play();

    setTimeout(function(){
        music.resume();
    }, 1000);
}