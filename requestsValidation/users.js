const { celebrate, Joi } = require('celebrate');

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Данил').required(),
    email: Joi.string().email().required(),
  }),
});

module.exports = { updateUserInfoValidation };
