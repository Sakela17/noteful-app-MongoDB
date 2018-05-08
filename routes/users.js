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
  const { username, password, fullname = '' } = req.body;

  const requiredFields = ['username', 'password'];

  const missingFields = requiredFields.find(field => {

  });



  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname,
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
    });

});

module.exports = router;