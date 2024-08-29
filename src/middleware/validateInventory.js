// Import the 'body' object from the 'express-validator' module for validating request bodies.
const { body } = require('express-validator');

/**
 * Middleware to validate the inventory data in HTTP requests.
 *
 * This middleware validates the request body to ensure the 'categoria' field is provided and
 * that the 'suministros' field is an array that is not empty. If validation fails, the appropriate
 * error messages are attached to the response.
 */
const validateInventory = [
  // Validate the 'categoria' field to ensure it is not empty.
  body('categoria')
    .notEmpty().withMessage('Inventory category is required'),
  
  // Validate the 'suministros' field to ensure it is an array and not empty.
  body('suministros')
    .isArray().withMessage('Supplies must be an array')
    .notEmpty().withMessage('The supply array cannot be empty'),
];

// Export the 'validateInventory' array so it can be used in other files as a middleware.
module.exports = validateInventory;
