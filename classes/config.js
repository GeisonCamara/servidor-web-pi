//var fs = require('fs');
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './../config/config.json' });

function config(){
    
}

config.prototype.set = function(config, status){
    nconf.set(config, status);
    nconf.save(function (err) {
        //fs.readFile('data.json', function (err, data) {
              //console.dir(JSON.parse(data.toString()))
        //});
    });
    console.log(config + 'set to' + status);
}

config.prototype.get = function(config){
    console.log(config);
    return nconf.get(config);
}

module.exports = new config();