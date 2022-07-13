// imports
const express = require("express");
const cors = require("cors");

// basic init setup
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

// parsing and cors
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// models
const db = require("./app/models");
const Role = db.role;
const Shop = db.shop;
const Product = db.product;

db.sequelize.sync();
// the following recreates all the database structure; if not necessary, just comment it
db.sequelize.sync({force: true}).then(() => {
    initial();
});

// root route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome! This application merges node + express + sequelize + jwt. " +
            "It exposes endpoints for a basic e-commerce site. It includes an authorization level based on roles " +
            "and authentication based on tokens to access to specific endpoints. This application uses a MySQL database."
    });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/shop.routes')(app);
require('./app/routes/product.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// this function populates some database tables
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });

    Shop.create({
        name: "coah"
    });

    Shop.create({
        name: "tolu"
    });

    Product.create({
        name: "pencil"
    });

    Product.create({
        name: "pants"
    });

    Product.create({
        name: "table"
    });
}
