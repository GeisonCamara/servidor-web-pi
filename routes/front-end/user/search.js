var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo/mongo.js');

function buildTable(item, all){
    var table = '<table><thead><tr><th>Nome</th>';
    if(all!=true){
        table += '<th>Chave</th><th>NFC</th>';
    }
    table += '</tr></thead><tbody>';
    for(var x=0; x<item.length; x++){
        table += '<tr><th>' + item[x].name + '</th></tr>';
        if(all!=true){
            table += '<tr><th>' + item[x].key + '</th></tr>' + '<tr><th>' + item[x].nfc + '</th></tr>';
        }
    }
    table += '</tbody></table>';
    return table;
}

router.get('/', function(req, res, next) {
    if(req.query.hasOwnProperty('user')){
        if(req.query.user=='all'){
            mongo.find({status: "A"}, res, function(res, userObj){
                console.log(userObj);
                var result = buildTable(userObj, true);
                res.type("text/html");
                res.send(result);
            });
        }
        else {
            mongo.find({name:req.query.user, status: "A"}, res, function(res, userObj){
                console.log(userObj);
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