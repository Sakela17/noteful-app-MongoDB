'use strict';

// const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

//Find user and validate password
const localStrategy = new LocalStrategy((username, password, done) => {



});
