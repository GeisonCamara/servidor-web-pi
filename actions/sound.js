module.exports = function(){
	var Sound = require('node-aplay');
	var config = require('./../classes/config');
	config.set('campainha:toque', 'dingdong.wav');
	var music = new Sound('/home/pi/node/trava/dev/servidor-web-pi/media/' + config.get('campainha:toque'));

	music.play();

	setTimeout(function(){
		music.resume();
	}, 1000);
}