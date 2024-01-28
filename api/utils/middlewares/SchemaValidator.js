const Joi = require("@hapi/joi");
const Schemas = require("../../joi/Schemas");
const _ = require("lodash");

module.exports = (useJoiError = false) => {
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;
  const _supportedMethods = ["post", "put", "patch"];
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  return async (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      const _schema = _.get(Schemas, route);

      if (_schema) {
        try {
          const data = await _schema.validateAsync(req.body, _validationOptions);
          // Handle the validated data if needed
          req.body = data; // Update the request body with the validated data if necessary
          next();

        } catch (err) {
          const JoiError = {
            errors: err.details.map((errorObject) => errorObject.message.replace(/['"]/g, "")),
          };

          const CustomError = {
            status: "failed",
            error: "Invalid request data. Please review the request and try again.",
          };

          // Use next(err) to pass the error to the next error-handling middleware
          return next(_useJoiError ? JoiError : CustomError);
        }
      }
    }

  };
};
