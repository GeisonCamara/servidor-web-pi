var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication');
//var users = mongoose.model('users', {name: String, role: String, status: String, devices: [{status: String, ID: String, value: String, timeRange: String},{status: String, ID: String, value: String, timeRange: String},{status: String, ID: String, value: String, timeRange: String},{status: String, ID: String, value: String, timeRange: String}]});
var users = mongoose.model('users', {name: String, role: String, status: String, devices: Array});
var historic = mongoose.model('historic', {date: String, time: String, user: String, device: String});

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
            console.log(err);
        }else if(userObj.length > 0){
            callback(res, userObj);
        }else{
            console.log('User not found!');
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
    console.log(newRegister);
    newRegister.save(function (err, userObj) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', userObj);
            callback();
        }
    });
}

mongo.prototype.update = function(queryObj, type, req, callback){
    users.findOne(queryObj, function (err, userObj) {
        if (err) {
            console.log(err);
        } else if (userObj) {
            console.log('Found:', JSON.stringify(userObj));
            userObj = callback(userObj, req);
            userObj.save(function (err) {
                console.log("Success");
                if (err) {
                    console.log(err);
                } else {
                    console.log('Updated', JSON.stringify(userObj));
                }
            });
        } else {
            console.log('User not found!');
        }
    });
}

module.exports = new mongo();