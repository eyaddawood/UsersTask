const Joi = require("@hapi/joi");

const userCreationSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  mobile: Joi.string().required(),
  country: Joi.string().required(),
  age: Joi.number().required(),

});




module.exports = {
  "/user": userCreationSchema,

};
