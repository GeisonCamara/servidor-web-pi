module.exports = function(type){
    var Sound = require('node-aplay');
    var config = require('./../classes/config');
    var music = new Sound('./../media/' + config.get('campainha:toque'));

    music.play();

    setTimeout(function(){
        music.resume();
    }, 1000);
}