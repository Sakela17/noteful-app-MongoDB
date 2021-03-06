'use strict';

// const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

//Find user and validate password
const localStrategy = new LocalStrategy((username, password, done) => {

  let user;

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
    })
    .then(() => {
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: password
        })
      }
    })
    .then(() => {
      return done(null, user, { success: true });
    })
    .catch(err => {
      console.log('************ LOGIN', err);

      if(err.reason === 'LoginError') {
        //Credintials are invalid -> trigger failureRedirect with 401 status - unauthorized
        console.log('************ LOGIN ERROR CATCH MESSAGE', err.message);
        return done(null, false, { success: false, message: err.message });
      }
      console.log('*************SECOND RETURN DONE********', done(err));
      return done(err);
    })

});

module.exports = localStrategy;
