var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication');
<<<<<<< a059f356a48ee520e7bceb2805d49e0b4b2bd4f1
var users = mongoose.model('users', {name: String, key: String, mobile: String, nfc: String, ativo: String});
=======
var users = mongoose.model('user', {name: String, key: String, mobile: String, nfc: String, status: String});
>>>>>>> routes
var historic = mongoose.model('historic', {dateTime: String, user: String, device: String});

function mongo(){

}

mongo.prototype.find = function(queryObj, res, callback){
    users.findOne(queryObj, function (err, userObj) {
        if(err){
            console.log(err);
        }else if(userObj){
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
        var newRegister = new user(newObj);
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

mongo.prototype.update = function(queryObj, callback){
    users.findOne(queryObj, function (err, userObj) {
        if (err) {
            console.log(err);
        } else if (userObj) {
            console.log('Found:', userObj);
            callback();
        //For demo purposes lets update the user on condition.
        /*if (userObj.age != 30) {
            //Some demo manipulation
            userObj.age += 30;

            //Lets save it
            userObj.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Updated', userObj);
                }
            });
        }*/
        } else {
            console.log('User not found!');
        }
    });
}

module.exports = new mongo();