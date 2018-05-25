console.log('---> Módulo do NFC');
var pn532 = require('./../../node_modules/pn532/src/pn532');
var SerialPort = require('serialport');

var serialPort = new SerialPort('/dev/ttyS0', { baudrate: 115200 });
var rfid = new pn532.PN532(serialPort);
var logger = require("winston");
var log = require("./../../config/log.js");
var users = require("./../../config/users.js");
var lock = require('./../../actions/lock.js');

rfid.on('ready', function() {
	console.log('---> Esperando por uma TAG...');
    logger.info('Esperando por uma TAG...');
    rfid.on('tag', function(tag) {
		console.log('---> Tag:', tag.uid);
    	for(var i=0; i < users.length; i++){
	        logger.info('UID:', tag.uid);
	        if(tag.uid==users[i].nfc){
	        	logger.info("TAG Válida!")
	        	lock('NFC', users[i].name);
	        }
	    }
    });
});