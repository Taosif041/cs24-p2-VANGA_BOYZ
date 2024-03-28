const Joi = require("joi");

const STSValidator = Joi.object({
  
  name: Joi.string(),
  wardNumber: Joi.number().required(),
  capacity: Joi.number().required(),
  gpsCoordinates: Joi.array().items(Joi.number()).required(),
});

module.exports = STSValidator;
