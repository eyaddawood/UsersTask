const user = require("./user.controller");

const SchemaValidator = require("../../utils/middlewares/SchemaValidator");

const Logger = require("../../utils/middlewares/LoggingRequests");
const validateRequest = SchemaValidator(true);
const tokenValidation = require("../../utils/middlewares/TokenValidation");

module.exports = (app) => {

    app.post("/user/login", Logger,validateRequest, user.Login);
  app.get("/user",Logger,user.getAllUsers);
    app.get("/user/:id",Logger, user.getUserById);

    app.post("/user", Logger,validateRequest, user.createUser);
    app.put("/user",Logger, validateRequest, user.editUser);
    app.delete("/user/:id",Logger, tokenValidation,user.deleteUser); // this route needs to login and get the token first



};
