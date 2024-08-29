// Import the Inventory model from the Inventory module
const Inventory = require('../models/inventory.model');

/**
 * Create a new inventory item in the database.
 * @param {Object} itemData - The data for the new inventory item.
 * @returns {Promise<Object>} - The created inventory item object.
 * @throws {Error} - Throws an error if the inventory item creation fails.
 */
const createInventoryItem = async (itemData) => {
  try {
    // Attempt to create a new inventory item with the provided data
    return await Inventory.create(itemData);
  } catch (error) {
    // Throw an error if the creation fails
    throw new Error('Error creating inventory item: ' + error.message);
  }
};

/**
 * Retrieve all inventory items from the database.
 * @returns {Promise<Array>} - An array of inventory item objects.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
const getAllInventoryItems = async () => {
  try {
    // Attempt to retrieve all inventory items from the database
    return await Inventory.findAll();
  } catch (error) {
    // Throw an error if the retrieval fails
    throw new Error('Error retrieving inventory items: ' + error.message);
  }
};

/**
 * Retrieve an inventory item by ID from the database.
 * @param {number} id - The ID of the inventory item to retrieve.
 * @returns {Promise<Object|null>} - The inventory item object if found, otherwise null.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
const getInventoryItemById = async (id) => {
  try {
    // Attempt to retrieve an inventory item by its ID
    return await Inventory.findByPk(id);
  } catch (error) {
    // Throw an error if the retrieval fails
    throw new Error('Error retrieving inventory item: ' + error.message);
  }
};

/**
 * Update an inventory item by ID in the database.
 * @param {number} id - The ID of the inventory item to update.
 * @param {Object} updateData - The data to update the inventory item with.
 * @returns {Promise<Object|null>} - The updated inventory item object if successful, otherwise null.
 * @throws {Error} - Throws an error if the update fails.
 */
const updateInventoryItemById = async (id, updateData) => {
  try {
    // Attempt to find the inventory item by its ID
    const item = await Inventory.findByPk(id);
    if (item) {
      // Update the inventory item with the provided data
      return await item.update(updateData);
    }
    return null; // Return null if the item was not found
  } catch (error) {
    // Throw an error if the update fails
    throw new Error('Error updating inventory item: ' + error.message);
  }
};

/**
 * Delete an inventory item by ID from the database.
 * @param {number} id - The ID of the inventory item to delete.
 * @returns {Promise<number>} - The number of rows affected (should be 1 if successful).
 * @throws {Error} - Throws an error if the deletion fails.
 */
const deleteInventoryItemById = async (id) => {
  try {
    // Attempt to delete the inventory item with the specified ID
    return await Inventory.destroy({ where: { id } });
  } catch (error) {
    // Throw an error if the deletion fails
    throw new Error('Error deleting inventory item: ' + error.message);
  }
};

// Export the CRUD functions for use in other modules
module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItemById,
  deleteInventoryItemById,
};
