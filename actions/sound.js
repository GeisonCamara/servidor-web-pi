module.exports = function(){
	var Sound = require('node-aplay');
	var music = new Sound('/home/pi/node/trava/dev/servidor-web-pi/media/dingdong.wav');

	music.play();

	setTimeout(function(){
		music.pause();
	}, 1000);

	setTimeout(function(){
		music.resume();
	}, 1000);

}