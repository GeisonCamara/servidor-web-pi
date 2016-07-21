var nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: './../config/data.json' });

function config(){
    
}

config.prototype.set = function(config, status){
    nconf.set(config, status);
    nconf.save(function (err) {});
}

config.prototype.get = function(config){
    return nconf.get(config);
}

module.exports = new config();