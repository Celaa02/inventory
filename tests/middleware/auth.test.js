const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../src/middleware/auth');

const app = express();
app.use(express.json());


app.get('/test', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const validToken = jwt.sign({ username: 'testuser' }, JWT_SECRET, { expiresIn: '1h' });
const invalidToken = 'invalidtoken';

describe('Middleware Authentication Tests', () => {
  it('should return 200 with a valid token', done => {
    request(app)
      .get('/test')
      .set('Authorization', `Bearer ${validToken}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ message: 'Access granted' })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 401 when no token is provided', done => {
    request(app)
      .get('/test')
      .expect('Content-Type', /json/)
      .expect(401)
      .expect({ message: 'Missing token' })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 403 with an invalid token', done => {
    request(app)
      .get('/test')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect('Content-Type', /json/)
      .expect(403)
      .expect({ message: 'Invalid token' })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
