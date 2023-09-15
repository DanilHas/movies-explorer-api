const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET, NODE_ENV } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
