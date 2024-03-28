const Joi = require('joi');

const createUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});

module.exports = createUserValidator;
