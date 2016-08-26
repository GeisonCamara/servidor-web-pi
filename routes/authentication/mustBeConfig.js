var mustBe = require("./../../node_modules/mustbe/mustbe");
var Mongo = require("./../../classes/mongo.js");

module.exports = function(config){
    config.routeHelpers(function(rh){
        rh.getUser(function(req, cb){
            var tokenCookie = req.cookies["token"];
            Mongo.find({devices: { $elemMatch: { value: tokenCookie } }}, 'user', cb, function(cb, userObj){
                console.log('success');
                config.activities(function(activities){
                    activities.can("users.view", function(identity, params, cb){
                        identity.isAuthenticated(function(err, isAuth){
                            return cb(err, isAuth);
                        });
                    });
                });
            },function(req2, res2){
                console.log('usuario não encontrado');
                rh.notAuthenticated(function(req, res, next){
                    res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br/login/erro'});
                    res.end()
                });
            });
        });
    });
};