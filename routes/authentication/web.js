var express = require('express');
var web = express.Router();
var Mongo = require("./../../classes/mongo.js");
var request = require('request');

function onSignIn(response) {
   console.log('Logou');
   window.location.assign("https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://localhost:3000&response_type=token&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com")
   setTimeout(function(){
       function queryObj() {
		    var result = {}, keyValuePairs = location.search.slice(1).split("&");
		    keyValuePairs.forEach(function(keyValuePair) {
		        keyValuePair = keyValuePair.split('=');
		        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
		    });
		    return result;
		}
		var myParam = queryObj();
		console.log(myParam);
    }, 5000);
};

module.exports = web;