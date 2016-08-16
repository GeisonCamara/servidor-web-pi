var express = require('express');
var token = express.Router();
var Mongo = require("./../../classes/mongo.js");
var lock = require('./../../actions/lock.js');
var request = require('request');

/*token.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    request({
        uri:"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + tokenGoogle,
        method:'GET'},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
            	Mongo.find({devices: { $elemMatch: { value: tokenGoogle } }}, 'user', res, function(res, userObj){
			    	lock('mobile', userObj[0].name);
			    	res.send({status: true});
			    },function(req2, res2){
			        res.send({status: false});
			        console.log('token fail');
			    });
            }
            else{
                console.log('e-mail desativado');
                res.send({status: false});
            }
        }
    )
});*/

token.post('/', function(req, res){
    var tokenGoogle = req.query.token;
    Mongo.find({devices: { $elemMatch: { value: tokenGoogle } }}, 'user', res, function(res, userObj){
    	if (userObj[0].name == 'admin'){
    		lock('mobile', userObj[0].name);
			res.send({status: true});
    	}
    	else{
	    	request({
		        uri:"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + tokenGoogle,
		        method:'GET'},
		        function (error, response, body) {
		            if (!error && response.statusCode == 200) {
		            	lock('mobile', userObj[0].name);
				    	res.send({status: true});
				    }
		            else{
		                console.log('e-mail desativado');
		                res.send({status: false});
		            }
	        	}
	        )
	    }
    },function(req2, res2){
        res.send({status: false});
        console.log('token fail');
    });
});

module.exports = token;