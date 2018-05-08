'use strict';

// const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

//Find user and validate password
const localStrategy = new LocalStrategy((username, password, done) => {

  let user;

  //Find user in DB
  User.findOne({ username })
    .then(result => {
      user = result;

      if(!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: username
        });
      }

      const isValid = user.validatePassword(password);

      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: password
        })
      }

      return done(null, user);

    })
    .catch(err => {

      if(err.reason === 'LoginError') {
        return done(null, false);
      }
      return done(err);

    })

});

module.exports = localStrategy;
