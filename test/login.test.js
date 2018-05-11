// 'use strict';
//
// const app = require('../server');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
//
// const { TEST_MONGODB_URI, JWT_SECRET } = require('../config');
//
// const User = require('../models/user');
//
// const expect = chai.expect;
// chai.use(chaiHttp);
//
// describe.only('Noteful API - Login', function () {
//
//   const fullname = 'Example User';
//   const username = 'exampleUser';
//   const password = 'password';
//
//   before(function () {
//     return mongoose.connect(TEST_MONGODB_URI)
//       .then(() => mongoose.connection.db.dropDatabase());
//   });
//
//   beforeEach(function () {
//     return User.hashPassword(password)
//       .then(digest => User.create({ fullname, username, password: digest }));
//   });
//
//
//   afterEach(function () {
//     return mongoose.connection.db.dropDatabase();
//   });
//
//   after(function () {
//     return mongoose.disconnect();
//   });
//
//   describe('/api/login', function() {
//
//     it('Should return a valid auth token', function() {
//       return chai.request(app)
//         .post('/api/login')
//         .send({ username, password })
//         .then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body.authToken).to.be.a('string');
//
//           const payload = jwt.verify(res.body.authToken, JWT_SECRET);
//
//           expect(payload.user).to.not.have.property('password');
//           expect(payload.user.username).to.equal(username);
//           expect(payload.user.fullname).to.equal(fullname);
//         });
//     });
//
//     it('Should reject requests without credentials', function() {
//
//       return chai.request(app)
//         .post('/api/login')
//         .send({})
//         .then(res => {
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Bad Request');
//         })
//
//     });
//
//     it('Should reject requests with missing username', function() {
//
//       return chai.request(app)
//         .post('/api/login')
//         .send({ username: '', password })
//         .then(res => {
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Bad Request');
//         })
//
//     });
//
//     it('Should reject requests with missing password', function() {
//
//       return chai.request(app)
//         .post('/api/login')
//         .send({ username, password: '' })
//         .then(res => {
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Bad Request');
//         })
//
//     });
//
//     it('Should reject requests with incorrect username', function() {
//
//       return chai.request(app)
//         .post('/api/login')
//         .send({ username: 'wrongUserName', password })
//         .then(res => {
//           expect(res).to.have.status(401);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Incorrect username');
//         })
//
//     });
//
//     it('Should reject requests with incorrect password', function() {
//
//       return chai.request(app)
//         .post('/api/login')
//         .send({ username, password: 'wrongPassword' })
//         .then(res => {
//           expect(res).to.have.status(401);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Incorrect password');
//         })
//
//     });
//
//   })
//
//   describe('Noteful /api/refresh', function() {
//
//     it('Should return a valid auth token', function() {
//
//       return chai.request(app)
//         .post('/api/login')
//
//
//     })
//
//   })
//
//   // TESTS GO HERE
//
// });