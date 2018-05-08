'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');


// router.get('/', (req, res, next) => {
//   // const { searchTerm, folderId, tagId } = req.query;
//
//   User.find()
//     .then(results => {
//       res.json(results);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

/* ========== POST/CREATE USERS ========== */
router.post('/', (req, res, next) => {
  const requiredFields = ['username', 'password'];

  const missingField = requiredFields.find(field => {
    return !(field in req.body);
  });

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: `Missing ${missingField} in request body`,
      location: missingField
    });
    // const err = new Error(`Missing ${missingField} in request body`);
    // //Unprocessable entity
    // err.status = 422;
    // return next(err);
  }
  const stringFields = ['username', 'password', 'fullname'];
  const nonStringField = stringFields.find(field => {
    return field in req.body && typeof req.body[field] !== 'string';
  });

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    })
  }

  const nonTrimmedField = stringFields.find(field => {
    return req.body[field].trim() !== req.body[field];
  });

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: `${nonTrimmedField} cannot start or end with a white space`,
      location: nonTrimmedField
    })
  }

  const sizedFields = {
    username: {
      min: 3
    },
    password: {
      min: 3,
      //bcrypt truncates string after 72 characters
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(field => {
    return 'min' in sizedFields[field]  && req.body[field].length < sizedFields[field].min;
  });

  const tooLargeField = Object.keys(sizedFields).find(field => {
    return 'max' in sizedFields[field]  && req.body[field].length > sizedFields[field].max;
  });

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField ? `Must be at least ${sizedFields[tooSmallField].min} characters long` : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField
    })
  }

  const { username, password, fullname = '' } = req.body;

  return User.hashPassword(password)
    .then(digest => {
      return User.create({
        username,
        password: digest,
        fullname,
      });
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {

      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      //
      // if (err.reason === 'ValidationError') {
      //   return res.status(err.code).json(err);
      // }

      res.status(500).json({code: 500, message: 'Internal server error'});
    });

});

module.exports = router;