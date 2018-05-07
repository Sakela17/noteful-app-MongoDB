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

  const newUser = {
    username,
    password,
    fullname,
  };

  User.create(newUser)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(next);
});

module.exports = router;