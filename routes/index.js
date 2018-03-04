"use strict";
(function (routes) {

    var ejsRoutes = require("./ejsRoutes.js");
    var apiRoutes = require("./apiRoutes.js");
    var setting = require('./../setting.js');

    routes.init = function (app) {

        app.get("/*/angular/*", function (req, res) {
            res.sendFile(setting.PROJECT_DIR + req.path);
        });
        app.get("/*/scripts/*", function (req, res) {
            res.sendFile(setting.PROJECT_DIR + req.path);
        });

        ejsRoutes.init(app);
        apiRoutes.init(app);

    };
})(module.exports);