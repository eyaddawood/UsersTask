const Sequelize = require("sequelize");


const DB_Connection = new Sequelize('Company', 'eyad', 'eyad12345', {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });
  
  



DB_Connection.authenticate()
.then(() => {
  console.log("Connection with DB has been established successfully.");
})
.catch((err) => {
  console.error("Unable to connect to the database:", err);
});

DB_Connection.sync({alter: false});

module.exports = {
  db: DB_Connection
};
