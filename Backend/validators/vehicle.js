const Joi = require('joi');

const VehicleValidator = Joi.object({
  registrationNumber: Joi.string().required(),
  type: Joi.string().valid('Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier').required(),
  capacity: Joi.number().required(),
  fuelCostPerKmLoaded: Joi.number().required(),
  fuelCostPerKmUnloaded: Joi.number().required(),
  stsID: Joi.string().optional(),
  status: Joi.string().valid('in sts', 'going to landfill', 'in landfill', 'return to sts')
  // Additional attributes as necessary
});

module.exports = VehicleValidator;