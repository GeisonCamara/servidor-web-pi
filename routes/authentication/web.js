var express = require('express');
var web = express.Router();
var Mongo = require("./../../classes/mongo.js");
var request = require('request');

web.get('/', function(req, res, next) {
  /* response.writeHead(301,
	  	{Location: 'https://google.com'}
	);
	response.end();*/
	console.log('r');
});

module.exports = web;