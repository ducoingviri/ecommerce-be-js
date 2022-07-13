const db = require("../models");
const Shop = db.shop;

exports.create = (req, res) => {
    Shop.create({
        name: req.body.name
    })
        .then(shop => {
            res.send({message: "Shop registered successfully!"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
