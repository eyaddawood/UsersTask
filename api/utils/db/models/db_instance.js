const Sequelize = require("sequelize");
const connections = require("../db");
const userTable = require("./user/user.model");


Object.keys(connections).forEach((db) => {
  //* Table Initialization
  // Patient schemas

  const user = connections[db].define("users", userTable, {
    charset: "utf8",
    collate: "utf8_general_ci",
  });

 
  


});

module.exports = connections;
