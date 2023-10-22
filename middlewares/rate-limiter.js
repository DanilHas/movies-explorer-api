const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  message: 'Слишком много запросов с данного IP, попробуйте позже',
});

module.exports = { limiter };
