const db = require("../models");
const Product = db.product;
const Shop = db.shop;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    Product.create({
        name: req.body.name
    })
        .then(product => {
            res.send({message: "Product registered successfully!"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.locate = (req, res) => {
    Product.findByPk(req.body.product_id)
        .then(product => {
            if (req.body.shops) {
                Shop.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.shops
                        }
                    }
                }).then(shops => {
                    product.setShops(shops).then(() => {
                        res.send({message: "Product located successfully!"});
                    });
                });
            } else {
                res.status(500).send({message: err.message});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.cart = (req, res) => {
    User.findByPk(req.body.user_id)
        .then(user => {
            if (req.body.products) {
                Product.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.products
                        }
                    }
                }).then(products => {
                    user.setProducts(products).then(() => {
                        res.send({message: "Products carted successfully!"});
                    });
                });
            } else {
                res.status(500).send({message: err.message});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};