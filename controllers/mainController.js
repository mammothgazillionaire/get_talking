/* jshint loopfunc:true */
(function (mainController) {

    mainController.init = function (app) {

        exports.renderIndex = function (req, res) {
            res.render('./general/index.ejs', {
                title : "Achimo",
                isLogged : false,
                name : ""
            });
        };

    };

})(module.exports);
