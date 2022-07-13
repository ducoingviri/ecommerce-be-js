module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shops", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Shop;
};
