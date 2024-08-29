// Import the DataTypes object from the 'sequelize' package
const { DataTypes } = require('sequelize');

// Import the Sequelize instance from the database configuration
const sequelize = require('../database');

// Define the 'Inventory' model using Sequelize
const Inventory = sequelize.define('Inventory', {
  // Define the 'categoria' field with type STRING
  categoria: {
    type: DataTypes.STRING, // Data type for the 'categoria' field is STRING
    allowNull: true, // This field can be null
  },
  // Define the 'suministros' field with type JSON
  suministros: {
    type: DataTypes.JSON, // Data type for the 'suministros' field is JSON
    allowNull: true, // This field can be null
  },
  salida: {
    type: DataTypes.BOOLEAN, // Data type for the 'suministros' field is JSON
    allowNull: true, // This field can be null
  },
}, {
  // Optional: Additional model options
  tableName: 'inventory', // Specify the table name in the database (defaults to model name)
  timestamps: true, // Include timestamp fields 'createdAt' and 'updatedAt' (default: true)
});

// Export the 'Inventory' model for use in other modules
module.exports = Inventory;