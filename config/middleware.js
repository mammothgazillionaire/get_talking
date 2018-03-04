(function (middleware) {


    middleware.init = function (app) {

        exports.isLoggedIn = function (req, res,next) {
            if (req.isAuthenticated())
                return next();

            if(req.xhr) {
                res.status(401).end();
            }

            else {
                req.flash('error_msg', 'You are not logged in!');
                res.redirect('/');
            }
        };

        exports.isAdminLoggedIn = function (req,res,next) {
            if(req.isAuthenticated()){
                if(req.user.defaultRole === 'Admin'){
                    return next();
                }
            }
            if(req.xhr) {
                res.status(401).end();
            }

            else {
                console.log("not admin");
                req.flash('error_msg', 'You are not logged in!');
                res.redirect('/');
            }
        }
    };
})(module.exports);
