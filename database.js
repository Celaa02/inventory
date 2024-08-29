// Import Sequelize from the 'sequelize' package
const { Sequelize } = require('sequelize');

// Import environment variables from the .env file
require('dotenv').config()

// Create a new Sequelize instance to manage the connection to the database
const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'mysql', // Specify the database dialect (MySQL in this case)
    logging: false, // Disable SQL query logging to the console
  }
);

// Export the Sequelize instance for use in other modules
module.exports = sequelize;