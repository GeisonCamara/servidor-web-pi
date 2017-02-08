var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication');
//var users = mongoose.model('users', {name: String, role: String, status: String, devices: [{status: String, ID: String, value: String, timeRange: String},{status: String, ID: String, value: String, timeRange: String},{status: String, ID: String, value: String, timeRange: String},{status: String, ID: String, value: String, timeRange: String}]});
var users = mongoose.model('users', {name: String, role: String, status: String, devices: Array});
var historic = mongoose.model('historic', {date: String, time: String, user: String, device: String});
var logger = require("winston");
var log = require("./../config/log.js");

function mongo(){

}

mongo.prototype.find = function(queryObj, type, res, callback, callbackNotFound){
    if(type == 'historic'){
        var search = historic;
    }
    else if(type == 'user'){
        var search = users;
    }
    search.find(queryObj, function (err, userObj) {
        if(err){
            logger.error(err);
        }else if(userObj.length > 0){
            callback(res, userObj);
        }else{
            logger.error('Usuário não encontrado!');
            callbackNotFound();
        }
    });
}

mongo.prototype.insert = function(newObj, type, callback){
    if(type == 'historic'){
        var newRegister = new historic(newObj);
    }
    else if(type == 'user'){
        var newRegister = new users(newObj);
    }
    logger.info(newRegister);
    newRegister.save(function (err, userObj) {
        if (err) {
            logger.error(err);
            if (callback) callback(false);
        } else {
            logger.info('Salvo com sucesso!');
            if (callback) callback(true);
        }
    });
}

mongo.prototype.update = function(name, access_token, action, callback){
    users.findOne(name, function (err, userObj) {
        if (err){
            logger.error(err);
        } else if (userObj){
            logger.info('Token novo: ' + access_token);
            if(action=='web'){
                userObj.devices[0].value = access_token;
            } else {
                userObj.devices[1].value = access_token;
            }
            userObj.update({ devices: userObj.devices }, function (err, token){
                if (err){
                    logger.error(err);
                    if (callback) callback(false);
                } else{
                    logger.info('Token atualizado: ' + token);
                    if (callback) callback(true);
                }
            });
        } else {
            logger.error('Usuário não encontrado!');
        }
    });
}

module.exports = new mongo();