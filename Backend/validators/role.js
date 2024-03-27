const Joi = require('joi');
const PermissionValidator = require('./permission');

const RoleValidator = Joi.object({
  roleName: Joi.string().required(),
  permissions: Joi.array().items(PermissionValidator),
});

module.exports = RoleValidator;