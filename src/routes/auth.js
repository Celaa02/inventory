// Express framework for handling HTTP requests.
const express = require('express');
// Library for hashing passwords.
const bcrypt = require('bcryptjs');
// Middleware for validating and sanitizing user input.
const { body, validationResult } = require('express-validator');
// Library for working with JSON Web Tokens (JWT).
const jwt = require('jsonwebtoken');

// Create a new router object for handling routes.
const router = express.Router();

// Load environment variables from a .env file.
require('dotenv').config()

// Import the users array from the user database.
const users = require('../db/user.db');

// Retrieve the JWT secret from the environment variables.
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * POST /login
 * Route for authenticating a user and returning a JWT token.
 * 
 * Validation:
 * - 'username': Must be a non-empty string.
 * - 'password': Must be a non-empty string.
 * 
 * Process:
 * 1. Validate the request body.
 * 2. Check if the user exists in the database.
 * 3. If the user exists and the password matches, generate a JWT token.
 * 4. Return the JWT token in the response.
 */
router.post('/login',
  // Validate 'username' field.
  body('username').isString().notEmpty().withMessage('Username is required'),

  // Validate 'password' field.
  body('password').isString().notEmpty().withMessage('Password is required'),
  (req, res) => {
    // Check for validation errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract 'username' and 'password' from the request body.
    const { username, password } = req.body;

    // Find the user by username in the database.
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ error: 'Incorrect username or password' });
    }

    // Check if the provided password matches the stored password.
    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect username or password' });
    }

    // Generate a JWT token valid for 1 hour.
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with the generated token.
    res.json({ message: 'The user is valid', token: token });
  }
);

/**
 * POST /register
 * Route for registering a new user.
 * 
 * Validation:
 * - 'username': Must be a non-empty string.
 * - 'password': Must be a string with a minimum length of 6 characters.
 * 
 * Process:
 * 1. Validate the request body.
 * 2. Check if the username already exists in the database.
 * 3. If not, hash the password and store the new user in the database.
 * 4. Respond with a success message.
 */
router.post('/register',
  // Validate 'username' field.
  body('username').isString().notEmpty(),

  // Validate 'password' field.
  body('password').isString().isLength({ min: 6 }),
  (req, res) => {
    // Check for validation errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract 'username' and 'password' from the request body.
    const { username, password } = req.body;

    // Check if the user already exists in the database.
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ error: 'The user already exists' });
    }
    
    // Hash the password before storing it.
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a new user object.
    const user = { username, password: hashedPassword };

    // Add the new user to the users array.
    users.push(user);

    // Respond with a success message.
    res.status(201).json({ message: 'User successfully registered' });
  }
);

// Export the router object so it can be used in other parts of the application.
module.exports = router;
