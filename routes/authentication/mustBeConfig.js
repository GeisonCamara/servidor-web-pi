var mustBe = require("./../../node_modules/mustbe/mustbe");
var Mongo = require("./../../classes/mongo.js");

module.exports = function(config) {

    config.userIdentity(function(id) {

        id.isAuthenticated(function(user, cb) {
            console.log('[mustBe] id.isAuthenticated');

            // var isAuthenticated = false;
            // if (user) {
            //     isAuthenticated = user.isLoggedIn();
            // }
            cb(null, true);
        });
    });

    config.routeHelpers(function(rh) {
        
        rh.getUser(function(req, cb) {
            var tokenCookie = req.cookies["token"];

            console.log('[mustBe] rh.getUser: token: ' + tokenCookie);

            if (!tokenCookie) cb('Usuário inválido.');

            Mongo.find({devices: { $elemMatch: { value: tokenCookie } }}, 'user', cb, function(cb, userObj){
                cb(null, { token: tokenCookie });
            }, function(){
                res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br/login/erro'});
                res.end();
                cb('Usuário inválido.');
            });
        });

        rh.notAuthorized(function(req, res, next) {
            console.log('[mustBe] rh.notAuthorized');

            res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br/login/erro'});
            res.end();
        });

        rh.notAuthenticated(function(req, res, next) {
            console.log('[mustBe] rh.notAuthenticated');

            res.writeHead(301, {'Location': 'http://porta.digitaldesk.com.br/login/erro'});
            res.end();
        });       

    });

    config.activities(function(activities) {

        activities.can("index.view", function(identity, params, cb) {
            console.log('[mustBe] activities.can');

            cb(null, true);
        });

    });
};