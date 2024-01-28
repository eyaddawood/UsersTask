const Joi = require("@hapi/joi");

const userCreationSchema = Joi.object({
  id: Joi.number(),
  Email: Joi.string().email().required(),
  Name: Joi.string().required(),
  Mobile: Joi.string().required(),
  Country: Joi.string().required(),
  Age: Joi.number().required(),

});

const userLoginSchema = Joi.object({
  Email: Joi.string().required(),

});


module.exports = {
  "/user": userCreationSchema,
  "/user/login": userLoginSchema,

};
