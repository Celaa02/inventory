// Import the DataTypes object from the 'sequelize' package
const { DataTypes } = require('sequelize');

// Import the Sequelize instance from the database configuration
const sequelize = require('../database');

// Define the 'User' model using Sequelize
const User = sequelize.define('User', {
  // Define the 'name' field with type STRING
  name: {
    type: DataTypes.STRING, // Data type for the 'name' field is STRING
    allowNull: false, // This field cannot be null
  },
  // Define the 'email' field with type STRING
  email: {
    type: DataTypes.STRING, // Data type for the 'email' field is STRING
    unique: true, // This field must be unique across all records
    allowNull: false, // This field cannot be null
  },
}, {
  // Optional: Additional model options
  tableName: 'users', // Specify the table name in the database (defaults to model name)
  timestamps: true, // Include timestamp fields 'createdAt' and 'updatedAt' (default: true)
});

// Export the 'User' model for use in other modules
module.exports = User;
