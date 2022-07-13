const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.shop = require("../models/shop.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.product.belongsToMany(db.shop, {
    through: "shop_products",
    foreignKey: "productId",
    otherKey: "shopId"
});
db.shop.belongsToMany(db.product, {
    through: "shop_products",
    foreignKey: "shopId",
    otherKey: "productId"
});

// cart: user_products
const User_Products = sequelize.define('user_products', {
    isPurchased: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
db.product.belongsToMany(db.user, {
    through: User_Products,
    foreignKey: "productId",
    otherKey: "userId"
});
db.user.belongsToMany(db.product, {
    through: User_Products,
    foreignKey: "userId",
    otherKey: "productId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
