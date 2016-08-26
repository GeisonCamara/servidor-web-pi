var mustBe = require("./../../node_modules/mustbe/mustbe");

module.exports = function(config){
    config.routeHelpers(function(rh){
        // get the current user from the request object
        rh.getUser(function(req, cb){
            var tokenCookie = req.cookies["token"];
            Mongo.find({devices: { $elemMatch: { value: tokenCookie } }}, 'user', res, function(res, userObj){
                config.activities(function(activities){
                    activities.can("users.view", function(identity, params, cb){
                        identity.isAuthenticated(function(err, isAuth){
                            return cb(err, isAuth);
                        });
                    });
                });
            },function(req2, res2){
                console.log('usuario não encontrado');
                rh.notAuthorized(function(req, res, next){
                    res.redirect("/login/erro");
                });
            });
                //cb(null, req.user);
        });
        // what do we do when the user is not authorized?
        /*rh.notAuthorized(function(req, res, next){
            res.redirect("/login/erro");
        });*/
    });
    /*config.activities(function(activities){
        // configure an activity with an authorization check
        activities.can("view thing", function(identity, params, cb){
            var id = params["id"];
            someLib.anotherThing(id, function(err, thing){
                if (err) { return cb(err); }
                var hasThing = !!thing;
                cb(null, hasThing);
            });
        });
    });*/
};