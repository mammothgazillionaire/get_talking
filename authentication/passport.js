// var passport = require('passport');
// var log = require('../config/logger').log;
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth2');
var async = require('async');
// const util = require('util');
// var services = require('./services').emitter;
var User       = require('../models/user');
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            // asynchronous
            process.nextTick(function() {
                User.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err){
                        return done(err);
                    }

                    // if no user is found, return the message
                    if (!user){
                        console.log("no user");
                        return done(null, false, 'No user found.');
                    }

                    if (!user.validPassword(password)){
                        console.log("wrong password");
                        return done(null, false, 'Oops! Wrong password.');
                    }
                    // all is well, return user
                    else{
                        return done(null, user);
                    }
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            // asynchronous
            process.nextTick(function() {
                // if the user is not already logged in:
                if (!req.user) {
                    console.log("not logged in");
                    User.findOne({ 'email' :  email }, function(err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            console.log("email taken");
                            return done(null, false, 'This email is already registered. Please login.');
                        } else {
                            console.log("creating user " + req.body.firstName + " "+ req.body.lastName);
                            // create the user
                            var newUser            = new User();

                            newUser.email    = email;
                            newUser.name.firstName    = req.body.firstName;
                            newUser.name.lastName    = req.body.lastName;
                            newUser.mobile    = req.body.mobile;
                            newUser.password = newUser.generateHash(password);


                            async.parallel([
                                    function(callback) {
                                        setTimeout(function() {
                                            newUser.save(function(err) {
                                                if (err)
                                                    return done(err);
                                            });
                                            console.log("new user created");
                                            callback(null,  false, 'You have successfully registered, please login.');
                                        }, 100);
                                    }
                                ],
                                // optional callback
                                function(err, results) {
                                    // the results array will equal ['one','two'] even though
                                    // the second function had a shorter timeout.
                                    if(err){
                                        console.log(err);
                                        return done(err);
                                    }
                                    else if(results){
                                        return done(null, false, 'You have successfully registered, please login.');
                                    }
                                });
                        }

                    });
                    // if the user is logged in but has no local account...
                } else if ( !req.user.email ) {
                    console.log("user logged in "  + req.user);
                    // ...presumably they're trying to connect a local account
                    // BUT let's check if the email used to connect a local account is being used by another user
                    User.findOne({ 'email' :  email }, function(err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            console.log("logged in user account " + user);
                            return done(null, false, 'This email is already registered. Please login');
                            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                        } else {
                            console.log("linking user email");
                            var user = req.user;
                            user.email = email;
                            user.password = user.generateHash(password);
                            async.parallel([
                                    function(callback) {
                                        setTimeout(function() {
                                            user.save(function(err) {
                                                if (err)
                                                    return done(err);
                                            });
                                            console.log("new user created");
                                            callback(null, false, 'You have successfully registered, please login.');
                                        }, 100);
                                    }
                                ],
                                // optional callback
                                function(err, results) {
                                    // the results array will equal ['one','two'] even though
                                    // the second function had a shorter timeout.
                                    if(err){
                                        console.log(err);
                                        return done(err);
                                    }
                                    else if(results){
                                        return done(null, false, 'You have successfully registered, please login.');
                                    }
                                });
                        }
                    });
                } else {
                    console.log("user is logged in and already has a local account");
                    // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });

        }));

};
