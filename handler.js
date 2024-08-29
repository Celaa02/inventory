// Import the serverless-http module, which is used to wrap the Express app for use with AWS Lambda
const serverless = require("serverless-http");

// Import the Express app from the 'server' module
const app = require('./server');

// Export the Lambda handler function, which wraps the Express app with serverless-http
exports.handler = serverless(app);
