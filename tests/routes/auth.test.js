// test/auth.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../../src/routes/auth');
const { describe } = require('mocha');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

describe('POST /api/auth/login', () => {
  it('should return a token when credentials are correct', done => {
    request(app)
      .post('/api/auth/login')
      .send({ username: 'Darly', password: 'vergara02' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('should return an error when credentials are incorrect', done => {
    request(app)
      .post('/api/auth/login')
      .send({ username: 'Darly', password: 'wrongpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  });

  it('should return an error when username is missing', done => {
    request(app)
      .post('/api/auth/login')
      .send({ password: 'vergara02' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  });

  it('should return an error when password is missing', done => {
    request(app)
      .post('/api/auth/login')
      .send({ username: 'Darly' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  });
});

describe('POST /api/auth/register', () => {
  it('should return the user has been register with successful', done => {
    request(app)
      .post('/api/auth/register')
      .send({ username: 'Estefania', password: 'eloy02' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
  });

  it('should return the user alrady exist', done => {
    request(app)
      .post('/api/auth/register')
      .send({ username: 'Darly', password: 'vergara02' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  });

  it('should return the username is empty', done => {
    request(app)
      .post('/api/auth/register')
      .send({ password: 'Luis' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  });

  
});