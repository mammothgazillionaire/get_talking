/* jshint loopfunc:true */
(function (authController) {
    var User       = require('./../models/user');
    var passport = require('passport');
    authController.init = function (app) {
        //Login Modal =================================
        app.post('/login', function(req, res, next) {
            passport.authenticate('local-login', function(err, user, info) {
                if (err) { return next(err); }
                //if there is no user in the response send the info back to modal
                if (!user) {
                    return res.send(info);
                }
                //user was able to login, send true and redirect
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.send({valid: true });
                });
            })(req, res, next);
        });

        app.post('/signup', function(req, res, next) {
            passport.authenticate('local-signup', function(err, user, info) {
                if (err) { return next(err); }
                //if there is no user in the response send the info back to modal
                if (!user) {
                    return res.send(info);
                }
                //user was able to login, send true and redirect
                req.logIn(user, function(err) {
                    console.log("user " + user);
                    if (err) { return next(err); }
                    return res.send({ valid: true });
                });
            })(req, res, next);
        });

        exports.createUser = function (req, res) {
            console.log('hit');
            var newUser = new User();

            newUser.email = 'user email';
            newUser.name.firstName = 'first';
            newUser.name.lastName = 'user';
            newUser.mobile = '4758748587';
            newUser.imageLink = '/teachers/profile_sample.jpg';
            newUser.password = newUser.generateHash('111111');

            newUser.save(function (error, savedUser) {
                console.log('well');
                if (error) {
                    res.status(500).send('Error: ' + error);
                } else if (savedUser) {
                    res.status(200).send('success: user id ' + savedUser._id)
                } else {
                    console.log("i do not get it");
                }
            });
        };

        exports.logOut = function (req, res) {
            req.logout();
            req.flash('success_msg', 'You are logged out');
            res.redirect('/');
        };

    }
})(module.exports);
