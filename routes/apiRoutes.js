"use strict";
(function(apiRoutes) {



    apiRoutes.init = function(app) {

        //controllers
        var mainController = require("./../controllers/mainController");
        var authController = require("./../controllers/authController");
        var middleware = require("./../config/middleware");

        mainController.init(app);
        authController.init(app);
        middleware.init(app);

        app.get( '/api/createUser',authController.createUser);
    }
})(module.exports);
