const { Op } = require("sequelize");
const { sequelize } = require("sequelize");
const databaseInstance = require("../../utils/db/models/db_instance");
const handleApiError = require("../../utils/middlewares/ErrorHandler");
const jwt = require("jsonwebtoken");
require('dotenv').config();



exports.Login = async (req, res) => {
  try {
    // Get admin user by request email
    const user = await databaseInstance.db.User.findOne({ where: { Email: req.body.Email } });
    if (!user) {
      return res.status(401).send({ message: "Email is incorrect" });
    }

    // Retrieve token
    const token = jwt.sign({ user: user.toJSON() }, process.env.HASHKEY, { expiresIn: '7d' });

    res.status(200).send({ userInfo: user, token: token });
  } catch (error) {
    console.error(error);
    handleApiError(res, error, "Login");
  }
};




exports.getAllUsers = async (req, res) => {
  try {
    const users = await databaseInstance.db.User.findAll({});
    if (!users) return res.status(200).send([]);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    handleApiError(res, error, "getAllUsers");

  }
};


exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) return res.status(400).send({ message: "Id is required" });
      const user = await databaseInstance.db.User.findAll({
        where: {
          id: id,
        },
    
      });
      if (user.length == 0) return res.status(404).send({ message: "User not found" });
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
    handleApiError(res, error, "getUserById");

    }
  };
  

  exports.createUser = async (req, res) => {
    try {
      const user = await databaseInstance.db.User.create(req.body);
      
      // Send a success response
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
    handleApiError(res, error, "createUser");
      
    }
  };

  exports.editUser = async (req, res) => {
    try {
      const user = await databaseInstance.db.User.update(req.body, {
        where: {
          id: req.body.id,
        },
      
      });
      
      // Send a success response
      res.status(200).json({ message: "User edited successfully" });
    } catch (error) {
      console.error(error);
    handleApiError(res, error, "editUser");
      

    }
  };

  exports.deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
      if(!id) return res.status(400).send({ message: "Id is required" });
      const user = await databaseInstance.db.User.destroy( {
        where: {
          id: id,
        },
      
      });
      
      // Send a success response
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
    handleApiError(res, error, "deleteUser");
      
    }
  };
  
  