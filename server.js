// Express framework for building APIs
const express = require('express');

// Middleware to enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');

// Middleware for parsing incoming request bodies
const bodyParser = require('body-parser');

// Routes for handling inventory-related requests
const inventoryRoutes = require('./src/routes/inventory');
// Routes for handling authentication-related requests
const authRoutes = require('./src/routes/auth');

// Initialize the Express application
const app = express();

// Define CORS options
const Options = {
  // Allow requests from any origin
  origin: '*',
  // Allow these HTTP methods 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Allow these headers 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware with the specified options
app.use(cors(Options));

// Apply bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mount inventory and authentication routes under the `/api` path
app.use('/api', inventoryRoutes);
app.use('/api', authRoutes);

// Define a simple root route for health checks or basic info
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Inventory API",
      });
});

// Export the Express app for use in other modules or to be wrapped by serverless functions
module.exports = app;