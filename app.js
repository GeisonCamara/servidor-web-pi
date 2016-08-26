var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var inicio = require('./routes/index');
var login = require('./routes/login');
var config = require('./routes/configurations');
var unlock = require('./routes/unlock');
var mobile = require('./routes/authentication/mobile.js');
var historic = require('./routes/front-end/historic/historic');
var historicSearch = require('./routes/front-end/historic/search');
var userInsert = require('./routes/front-end/user/insert');
var userUpdate = require('./routes/front-end/user/update');
var userSearch = require('./routes/front-end/user/search');
var abrirPorta = require('./routes/authentication/abrirPorta.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', inicio);
//app.use('/config', config);
app.use('/login', login);
app.use('/unlock', unlock);
if(config.get('mobile')){
    /*app.use('/authentication/mobile/', mobile);*/
    app.use('/AbrirPorta', abrirPorta);
    app.use('/Autenticar', mobile);
}
if(config.get('historicInterface')){
    app.use('/historic', historic);
    app.use('/historic/search', historicSearch);
}
if(config.get('userInterface')){
    app.use('/user/cadastrar', userInsert);
    app.use('/user/alterar', userUpdate);
    app.use('/user/buscar', userSearch);
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var mustBe = require("./node_modules/mustbe/mustbe");
var mustBeConfig = require("./routes/authentication/mustBeConfig");
mustBe.configure(mustBeConfig);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        
        res.render('error', {
            message: err.message,
            error: err
        });
        
        //res.redirect('porta.digitaldesk.com.br');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    
    res.render('error', {
        message: err.message,
        error: {}
    });
    
    //res.redirect('porta.digitaldesk.com.br');
});

module.exports = app;
