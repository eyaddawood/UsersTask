const user = require("./user.controller");

// const adminUserValidation = require("../../../utils/middlewares/token/PayerUserValidation");
// const SchemaValidator = require("../../../utils/middlewares/SchemaValidator");
// const providerValidation = require("../../../utils/middlewares/token/ProviderUserValidation");
// const validateOwnership = require("../../../utils/middlewares/validateOwnership");

// const validateRequest = SchemaValidator(true);

module.exports = (app) => {

  app.get("/user", user.getAllUsers);
    app.get("/user/:id", user.getUserById);


};
