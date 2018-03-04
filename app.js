/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    https = require('https'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');

var app = express();
var assert = require('assert-plus');
var util = require('util');
var port = 8000;
// Then we'll pull in the database client library
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');

// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
require('./authentication/passport')(passport); // pass passport for configuration
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
// Connect Flash
app.use(flash());
app.enable('trust proxy');
// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();

});

routes.init(app, passport);
// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

var uri = 'mongodb+srv://nupuragrahari:nupur1..@gettalkingdev-lmctj.mongodb.net/getTalkingDev?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin';
mongoose.connect(uri,
    {
        poolSize: 2,
        promiseLibrary: global.Promise
    }
).then(function () {
    console.log("connected");
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});


// Start listening on the port
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});


// http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
//     console.log('Express server listening on port ' + app.get('port'));
// });
