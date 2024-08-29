const request = require('supertest');

const app = require('../server');
const { describe } = require('mocha');


it('repond with json containing a message Inventory API', done => {
    request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
})
