// tests/routes/inventory.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const inventoryRoutes = require('../../src/routes/inventory'); 

const { v4: uuidv4 } = require('uuid');

const inventory = require('../../src/db/inventory.db');

const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const token = jwt.sign({ username: 'Darly' }, JWT_SECRET, { expiresIn: '1h' });


app.use((req, res, next) => {
  req.user = { id: 1, username: 'Darly' }; 
  next();
});

app.use('/api', inventoryRoutes);

describe('Inventory Routes with Validations', () => {
  const validItem = {
    id: "1",
    categoria: 'Papelería',
    suministros: ['Hojas de papel (A4, A3)', 'Carpetas', 'Sobres']
  };

  const updatedItem = {
    categoria: 'Papelería',
    suministros: ['Hojas de papel (A4, A3)', 'Post-it']
  };

  beforeEach(() => {
    inventory.length = 0;  
  });

  it('GET /inventory should return status 400 if no records found', function (done) {
    request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('{"message":"No records"}')
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET /inventory should return status 200 with inventory list', function (done) {
    request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send(validItem)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        request(app)
          .get('/api/inventory')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect({"message":"All records","data":[{"id":"1","categoria":"Papelería","suministros":["Hojas de papel (A4, A3)","Carpetas","Sobres"]}]})
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });
  });

  it('GET /inventory/:id should return status 400 if id is invalid', function (done) {
    request(app)
      .get('/api/inventory/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .expect('{"message":"Inventory not found"}')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('POST /inventory should return status 201 with a new inventory item', function (done) {
    request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send(validItem)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect({"message":"Inventory has been successfully created","data":{"id":"1","categoria":"Papelería","suministros":["Hojas de papel (A4, A3)","Carpetas","Sobres"]}})
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('POST /inventory should return status 400 for invalid data', function (done) {
    request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send({ categoria: '' })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({"errors":[{"type":"field","value":"","msg":"Inventory category is required","path":"categoria","location":"body"},{"type":"field","msg":"Supplies must be an array","path":"suministros","location":"body"},{"type":"field","msg":"The supply array cannot be empty","path":"suministros","location":"body"}]})
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('PUT /inventory/:id should return status 400 if id is invalid', function (done) {
    request(app)
      .put('/api/inventory/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedItem)
      .expect(404)
      .expect('Content-Type', /json/)
      .expect('{"message":"Inventory not found"}')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

});