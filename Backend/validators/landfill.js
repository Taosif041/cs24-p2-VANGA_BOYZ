const Joi = require('joi');

const landfillValidator = Joi.object({
  LandfillName: Joi.string().required(),
  capacity: Joi.number().required(),
  operationalTimespan: Joi.string().required(),
  gpsCoordinates: Joi.array().items(Joi.number()).required()
});

module.exports = landfillValidator;