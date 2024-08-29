// Express framework for handling HTTP requests
const express = require('express');

// Import middleware for token authentication and request validation
const authenticateToken = require('../middleware/auth')
const validateInventory = require('../middleware/validateInventory');

// Import Express Validator for parameter validation
const { param, validationResult } = require('express-validator');

// Import the inventory database (an array representing inventory items)
const inventory = require('../db/inventory.db'); 

// Create a new router object for handling routes
const router = express.Router();

/**
 * GET /inventory
 * Retrieve all inventory records.
 * 
 * Process:
 * 1. Authenticate the request using the `authenticateToken` middleware.
 * 2. Check if the inventory array is empty; if so, respond with a 400 status and a "No records" message.
 * 3. If inventory records exist, return them with a 200 status.
 */
router.get('/inventory', authenticateToken, (req, res) => {
  if (inventory.length === 0) {
    return res.status(400).json({
      message: "No records"
    });
  }
  return res.status(200).json({
    message: "All records",
    data: inventory
  });
});

/**
 * GET /inventory/:id
 * Retrieve a single inventory record by its ID.
 * 
 * Process:
 * 1. Authenticate the request using the `authenticateToken` middleware.
 * 2. Validate the `id` parameter.
 * 3. Check if the item exists in the inventory; if not, respond with a 404 status and "Inventory not found" message.
 * 4. If the item is found, return it with a 200 status.
 */
router.get('/inventory/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = inventory.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    return res.status(200).json({
      message: "registration is successfully obtained",
      data: item
    });
  }
);

/**
 * POST /inventory/salida
 * Inventory outflow.
 * 
 * Process:
 * 1. Authenticate the request using the `authenticateToken` middleware.
 * 2. Validate the request body using the `validateInventory` middleware.
 * 3. Check for validation errors; if any, respond with a 400 status.
 */
router.post('/inventory/salida', authenticateToken, (req, res) => {
  let salida = req.body.salida;
  if (!salida) {
    return res.status(400).json({ errors: errors.array() });
  }

  const item = inventory.find(i => i.salida === salida);
  if (!item) {
    return res.status(404).json({ message: 'Inventory not found for outflow' });
  }

  return res.status(200).json({
    message: "inventory outflow",
    data: item
  });
}
);

/**
 * POST /inventory
 * Create a new inventory record.
 * 
 * Process:
 * 1. Authenticate the request using the `authenticateToken` middleware.
 * 2. Validate the request body using the `validateInventory` middleware.
 * 3. Check for validation errors; if any, respond with a 400 status.
 * 4. Create a new inventory item with a unique ID and push it to the inventory array.
 * 5. Respond with a 201 status and the newly created item.
 */
router.post('/inventory', authenticateToken, validateInventory, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newItem = {
    id: (inventory.length + 1).toString(),  
    categoria: req.body.categoria,
    suministros: req.body.suministros,
    salida: req.body.salida
  };

  inventory.push(newItem);

  return res.status(201).json({
    message: "Inventory has been successfully created",
    data: newItem
  });
});

/**
 * PUT /inventory/:id
 * Update an existing inventory record by its ID.
 * 
 * Process:
 * 1. Authenticate the request using the `authenticateToken` middleware.
 * 2. Validate the `id` parameter.
 * 3. Find the inventory item by its ID; if not found, respond with a 404 status and "Inventory not found" message.
 * 4. Update the inventory item with the new data from the request body.
 * 5. Respond with a 200 status and the updated item.
 */
router.put('/inventory/:id', authenticateToken, 
  (req, res) => {
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({ errors: errors.array() });
    }

    const index = inventory.findIndex(i => i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    inventory[index] = {
      id: req.params.id,
      categoria: req.body.categoria,
      suministros: req.body.suministros,
      salida: req.body.salida
    };

    return res.status(200).json({
      message: "Successfully updated",
      data: inventory[index]
    });
  }
);

/**
 * DELETE /inventory/:id
 * Remove an inventory record by its ID.
 * 
 * Process:
 * 1. Authenticate the request using the `authenticateToken` middleware.
 * 2. Validate the `id` parameter.
 * 3. Find the inventory item by its ID; if not found, respond with a 404 status and "Inventory not found" message.
 * 4. Remove the item from the inventory array.
 * 5. Respond with a 200 status and a success message.
 */
router.delete('/inventory/:id', authenticateToken, 
  (req, res) => {
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({ errors: errors.array() });
    }

    const index = inventory.findIndex(i => i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    inventory.splice(index, 1);

    return res.status(200).json({
      message: "Successfully removed"
    });
  }
);

// Export the router object so it can be used in other parts of the application
module.exports = router;