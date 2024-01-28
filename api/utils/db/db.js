const Sequelize = require("sequelize");
require('dotenv').config();


const DB_Connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  });
  
  




module.exports = {
  db: DB_Connection
};
