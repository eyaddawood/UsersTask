const Sequelize = require("sequelize");

const userTable = {
  Name: {
        type: Sequelize.STRING,
        allowNull: false,
     },
     
  Email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already in use",
    },
  },



  Mobile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  Country: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  
};

module.exports = userTable;
