const {authJwt} = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/product/create",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.create
    );

    app.post(
        "/api/product/locate",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.locate
    );

    app.post(
        "/api/product/cart",
        [authJwt.verifyToken],
        controller.cart
    );
};
