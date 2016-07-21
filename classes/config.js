var nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: 'data.json' });

function config(){
    
}

config.prototype.set = function(config, status){
    nconf.set(config, status);
    nconf.save(function (err) {});
    console.log(config + 'set to' + status);
}

config.prototype.get = function(config){
    console.log(nconf.get(config));
    return nconf.get(config)
}

module.exports = new config();