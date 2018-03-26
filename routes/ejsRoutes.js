"use strict";

(function(ejsRoutes) {



    ejsRoutes.init = function(app) {

        //controllers
        var mainController = require("./../controllers/mainController");
        var authController = require("./../controllers/authController");
        var middleware = require("./../config/middleware");

        mainController.init(app);
        authController.init(app);
        middleware.init(app);

        app.get( '/', mainController.renderIndex);
        app.get( '/me',middleware.isLoggedIn, mainController.renderProfile);

    }
})(module.exports);
