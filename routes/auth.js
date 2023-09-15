const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/auth');
const {
  signinValidation,
  signupValidation,
} = require('../requestsValidation/auth');

router.post('/signin', signinValidation, login);

router.post('/signup', signupValidation, createUser);

router.post('/signout', logout);

module.exports = router;
