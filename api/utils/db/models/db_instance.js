const Sequelize = require("sequelize");
const connections = require("../db");
const userTable = require("./user/user.model");

const db = {};

Object.keys(connections).forEach((dbKey) => {
  const connection = connections[dbKey];

  // Table Initialization
  const user = connection.define("users", userTable, {
    charset: "utf8",
    collate: "utf8_general_ci",
  });

  // Add the model to the db object
  db[dbKey] = {
    User: user,
    // Add other models if needed
  };
});

module.exports = db;
