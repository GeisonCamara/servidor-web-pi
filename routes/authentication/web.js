var express = require('express');
var web = express.Router();
var Mongo = require("./../../classes/mongo.js");
var request = require('request');

web.get('/', function(req, res, next) {
    console.log('foi');
});

module.exports = web;*