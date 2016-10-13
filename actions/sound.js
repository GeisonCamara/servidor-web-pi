module.exports = function(type){
    var Sound = require('node-aplay');
    var config = require('./../classes/config');
    var music = new Sound('/home/pi/node/trava/dev/servidor-web-pi/media/' + config.get('campainha:toque'));
    var unlock = new Sound('/home/pi/node/trava/dev/servidor-web-pi/media/' + config.get('unlock:toque'));

    music.play();

    if(type=='campainha'){
	    setTimeout(function(){
	        music.resume();
	    }, 1000);
    }
    else{
    	unlock.resume();
    }
}