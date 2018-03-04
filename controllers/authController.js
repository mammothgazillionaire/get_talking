/* jshint loopfunc:true */
(function (authController) {
    var User       = require('./../models/user');
    authController.init = function (app) {

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
    }
})(module.exports);
