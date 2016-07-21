//var fs = require('fs');

function config(){
    this.nconf = require('nconf');
    this.nconf.argv()
        .env()
        .file({ file: './../config/config.json' });    
}

config.prototype.setFile = function(config){
    this.nconf = require('nconf');
    this.nconf.argv()
        .env()
        .file({ file: './../config/config.json' });    
}

config.prototype.set = function(config, status){
    this.nconf.set(config, status);
    this.nconf.save(function (err) {
        //fs.readFile('data.json', function (err, data) {
              //console.dir(JSON.parse(data.toString()))
        //});
    });
    console.log(config + 'set to' + status);
}

config.prototype.get = function(config){
    console.log(this.nconf.get(config));
    return this.nconf.get(config);
}

module.exports = new config();