var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo.js');
var log = require("./../../../config/log.js");
var logger = require("winston");

function buildTable(item, all){
    var table = '<table><thead><tr><th>Nome</th>';
    if(all!=true){
        table += '<th>Chave</th><th>NFC</th>';
    }
    table += '</tr></thead><tbody>';
    for(var x=0; x<item.length; x++){
        table += '<tr><th>' + item[x].name + '</th>';
        if(all!=true){
            table += '<th class=' + item[x].devices[0].status + '>' + item[x].devices[0].value + '</th><th class=' + item[x].devices[1].status + '>' + item[x].devices[1].value + '</th><th class=' + item[x].devices[2].status + '>' + item[x].devices[2].value + '</th>';
        }
        table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
}

router.get('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        if(req.query.user=='all'){
            mongo.find({status: "A"}, 'user', res, function(res, userObj){
                //logger.info(userObj);
                var result = buildTable(userObj, true);
                res.type("text/html");
                res.send(result);
            });
        }
        else {
            mongo.find({name:req.query.user, status: "A"}, 'user', res, function(res, userObj){
                //logger.info(userObj);
                var result = buildTable(userObj, false);
                res.type("text/html");
                res.send(result);
            });
        }
    }
    else {
        res.sendStatus(404);
    }
});

module.exports = router;