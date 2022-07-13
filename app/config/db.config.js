module.exports = {
    HOST: "192.168.100.100",
    USER: "developer",
    PASSWORD: "developer",
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
