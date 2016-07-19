var express = require('express');
var router = express.Router();
var mongo = require('./../../../classes/mongo/mongo.js');

function buildTable(item, all){
    var table = '<table><thead><tr><th>Data</th><th>Horário</th><th>Usuário</th><th>Dispositivo</th></tr></thead><tbody>';
    for(var x=0; x<item.length; x++){
        table += '<tr><th>' + item[x].date + '</th>' + '<th>' + item[x].time + '</th>' + '<th>' + item[x].user + '</th>' + '<th>' + item[x].device + '</th></tr>';
    }
    table += '</tbody></table>';
    return table;
}

router.get('/', function(req, res, next) {
    mongo.find({}, 'historic', res, function(res, userObj){
        console.log(userObj);
        var result = buildTable(userObj, true);
        res.type("text/html");
        res.send(result);
    });
});

module.exports = router;