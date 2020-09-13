const sequelize = require("sequelize");

const db = new sequelize("crud", "root", "", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;