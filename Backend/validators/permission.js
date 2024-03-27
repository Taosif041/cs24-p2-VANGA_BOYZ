const Joi = require('joi');

const PermissionValidator = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().optional(),
});

module.exports = PermissionValidator;