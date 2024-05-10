// contractorValidator.js
const Joi = require('joi');

const contractorValidationSchema = Joi.object({
  companyName: Joi.string().required(),
  registrationId: Joi.string().required(),
  registrationDate: Joi.date().required(),
  tin: Joi.string().required(),
  contactNumber: Joi.string().required(),
  workforceSize: Joi.number().required(),
  paymentPerTonnageOfWaste: Joi.number().required(),
  requiredAmountOfWastePerDay: Joi.number().required(),
  contractDuration: Joi.number().required(),
  
  designatedSTS: Joi.string().required()
});

module.exports = contractorValidationSchema;
