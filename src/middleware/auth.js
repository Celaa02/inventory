// Import the 'jsonwebtoken' module to work with JWT tokens.
const jwt = require('jsonwebtoken');

// Load environment variables from a .env file.
require('dotenv').config()

// Retrieve the JWT secret from the environment variables.
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to authenticate a JWT token in HTTP requests.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Function to pass control to the next middleware.
 *
 * This middleware checks for the presence of a token in the request headers,
 * validates it using the JWT secret, and if valid, attaches the user information
 * to the request object (req.user). If the token is missing or invalid, it sends
 * a response with the appropriate status code.
 */

function authenticateToken(req, res, next) {
  // Extract the JWT token from the authorization header.
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, respond with a 401 (Unauthorized) error.
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // Verify the token using the JWT secret.
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {

      // If the token is invalid or expired, respond with a 403 (Forbidden) error.
      return res.status(403).json({ message: 'Invalid token' });
    }

    // If the token is valid, attach the user information to the request object.
    req.user = user;
    // Pass control to the next middleware.
    next(); 
  });
}

// Export the 'authenticateToken' function so it can be used in other files.
module.exports = authenticateToken;