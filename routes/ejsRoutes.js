"use strict";

(function(ejsRoutes) {



    ejsRoutes.init = function(app) {

        //controllers
        var mainController = require("./../controllers/mainController");

        var middleware = require("./../config/middleware");

        mainController.init(app);
        middleware.init(app);

        app.get( '/', mainController.renderIndex);  

    }
})(module.exports);
