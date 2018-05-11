'use strict';

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../config');

const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithm: ['HS256']
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  // console.log('********************* PAY LOAD', payload);
  done(null, payload.user);
});

module.exports = jwtStrategy;