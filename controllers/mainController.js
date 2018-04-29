/* jshint loopfunc:true */
(function (mainController) {

    mainController.init = function (app) {

        exports.renderIndex = function (req, res) {
            res.render('./general/index.ejs', {
                title : "Get talking",
                isLogged : false,
                name : ""
            });
            
        };

        exports.renderProfile = function (req,res) {
            res.render('./general/profile.ejs', {
                title : "Get talking",
                firstName : req.user.name.firstName
            });
        };

        exports.renderChat = function (req,res) {
            res.render('./chat/chat.ejs', {
                title : "Get talking",
                firstName : req.user.name.firstName
            });
        }

    };

})(module.exports);
