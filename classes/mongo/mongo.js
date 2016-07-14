var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication');
var users = mongoose.model('user', {name: String, key: String, nfc: String});
var historic = mongoose.model('historic', {dateTime: String, user: String, device: String});

function mongo(){

}

mongo.prototype.find = function(queryObj, res, callback){
    users.findOne(queryObj, function (err, userObj) {
        if(err){
            console.log(err);
        }else if(userObj){
            var user = userObj.name;
            console.log(user);
            callback();
        }else{
            console.log('User not found!');
            res.sendStatus(404);
        }
    });
}

mongo.prototype.insert = function(newUserObj, callback){
    var newRegister = new historic(newUserObj);
    console.log(newUser);
    newUser.save(function (err, userObj) {
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