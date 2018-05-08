'use strict';

const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const options = { session: false, failWithError: true};

function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

const localAuth = passport.authenticate('local', options);
const jwtAuth = passport.authenticate('jwt', options);


router.post('/login', localAuth, (req, res) => {
  // console.log(`${req.user.username} successfully logged in.`);
  const authToken = createAuthToken(req.user);
  console.log('**************** AUTH TOKEN', authToken);
  res.json({ authToken });
});

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  console.log('********************** AUTHTOKEN', authToken);
  res.json({ authToken });
});


module.exports = router;