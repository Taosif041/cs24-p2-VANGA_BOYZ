const Joi = require('joi');

const WorkforceValidator = Joi.object({
  fullName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  dateOfHire: Joi.date().required(),
  jobTitle: Joi.string().required(),
  paymentRatePerHour: Joi.number().required(),
  contactNumber: Joi.string().required(),
  contractorId: Joi.string().required(),
  requiredWorkTimeHour: Joi.number().required()

});

module.exports = WorkforceValidator;
