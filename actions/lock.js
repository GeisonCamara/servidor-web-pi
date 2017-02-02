module.exports = function(device, user){
    var mongo = require('./../classes/mongo.js');
    var unlockSound = require('./unlockSound.js');
    var logger = require("winston");
    
    var now = new Date();  
    var dia = now.getDate();
    var mes = now.getMonth()+1;
    var ano = now.getFullYear();
    var hora = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    var data = dia+'/'+mes+'/'+ano;
    var time = hora;

    if(user==undefined){
        user='web';
    }

    /*if(user!='Exit button'){
        unlockSound();
    }*/
    
    var insertObj = {date: data, time: time, user: user, device: device};
    
    var Gpio = require('onoff').Gpio,
        lock = new Gpio(20, 'out');
    
    lock.writeSync(1);

    logger.info(user + " abriu a porta!");
    
    console.log(insertObj);

    mongo.insert(insertObj, 'historic', function(){});
    setTimeout(function(){
        lock.writeSync(0);
    },3000);
}