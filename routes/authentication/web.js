var express = require('express');
var web = express.Router();
var Mongo = require("./../../classes/mongo.js");
var request = require('request');

function onSignIn(response) {
   console.log('Logou');
   location.assign("https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://localhost:3000&response_type=token&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com");
};

module.exports = web;