const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_DATABASE_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD || "",
        {
            host: process.env.DB_HOST_URL,
            dialect: "mysql"
        }
    );
}

module.exports = sequelize;