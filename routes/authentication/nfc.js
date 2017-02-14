var pn532 = require('./../../node_modules/pn532/src/pn532');
var SerialPort = require('serialport').SerialPort;

var serialPort = new SerialPort('/dev/ttyS0', { baudrate: 115200 });
var rfid = new pn532.PN532(serialPort);
var logger = require("winston");
var log = require("./../../config/log.js");
var users = require("./../../config/users.js");
var lock = require('./../../actions/lock.js');

console.log('Waiting for rfid ready event...');
rfid.on('ready', function() {
    console.log('Listening for a tag scan...');
    rfid.on('tag', function(tag) {
    	for(var i=0; i < users.length; i++){
	        console.log(Date.now(), 'UID:', tag.uid);
	        if(tag.uid==users[i].nfc){
	        	console.log("TAG Válida!")
	        	lock('NFC', users[i].name);
	        }
	    }
    });
});