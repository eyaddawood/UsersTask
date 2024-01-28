const { Op } = require("sequelize");
const { sequelize } = require("sequelize");
const databaseInstance = require("../../utils/db/models/db_instance");
// const handleApiError = require("../../../utils/middlewares/ErrorHandler");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await databaseInstance.db.User.findAll({});
    if (!users) return res.status(200).send([]);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};


exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
      const user = await databaseInstance.db.User.findAll({
        where: {
          id: id,
        },
    
      });
      if (user.length == 0) return res.status(404).send({ message: "User not found" });
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  };
  