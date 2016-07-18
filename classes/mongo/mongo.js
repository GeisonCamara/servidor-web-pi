var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication');
var users = mongoose.model('users', {name: String, key: String, mobile: String, nfc: String, status: String});
var historic = mongoose.model('historic', {dateTime: String, user: String, device: String});

function mongo(){

}

mongo.prototype.find = function(queryObj, type, res, callback){
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
            res.sendStatus(404);
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

mongo.prototype.update = function(queryObj, req, callback){
    users.findOne(queryObj, function (err, userObj) {
        if (err) {
            console.log(err);
        } else if (userObj) {
            console.log('Found:', userObj);
            userObj = callback(userObj, req);
            userObj.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Updated', userObj);
                }
            });
        } else {
            console.log('User not found!');
        }
    });
}

module.exports = new mongo();