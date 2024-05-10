const Joi = require("joi");

const STSValidator = Joi.object({
  name: Joi.string(),
  wardNumber: Joi.number().required(),
  capacity: Joi.number().required(),
  compensationFinePerTon: Joi.number().required(),
  gpsCoordinates: Joi.array().items(Joi.number()).required(),
  collectionHours: Joi.object({
    startTime: Joi.string().required(),
    endTime: Joi.string().required()
  }).required()
});

module.exports = STSValidator;
