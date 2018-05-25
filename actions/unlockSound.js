module.exports = function(){
    var unlockSound = require('node-aplay');
    var config = require('./../classes/config');
    var music = new unlockSound('./../media/unlock.wav');// + config.get('unlock:toque'));

    console.log('musica');
    music.play();

    music.resume();
}