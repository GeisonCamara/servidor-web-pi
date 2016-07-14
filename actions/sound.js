module.exports = function(){
	var Sound = require('node-aplay');
	var music = new Sound('./../media/dingdong.wav');

	music.play();

	setTimeout(function(){
		music.pause();
	}, 1000);
	
	/*
	setTimeout(function(){
		music.resume();
	}, 3000);
	*/
}