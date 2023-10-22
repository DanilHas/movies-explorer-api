const { celebrate, Joi } = require('celebrate');
const { regexToCheckUrl } = require('../utils/constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexToCheckUrl).required(),
    trailerLink: Joi.string().regex(regexToCheckUrl).required(),
    thumbnail: Joi.string().regex(regexToCheckUrl).required(),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = { createMovieValidation, deleteMovieValidation };
