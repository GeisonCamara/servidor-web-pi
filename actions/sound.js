module.exports = function(type){
    var Sound = require('node-aplay');
    var config = require('./../classes/config');
    var music = new Sound('/home/pi/node/trava/dev/servidor-web-pi/media/' + config.get('campainha:toque'));

    music.play();

    setTimeout(function(){
        music.resume();
    }, 1000);
}