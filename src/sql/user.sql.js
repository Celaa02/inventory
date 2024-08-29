// Import the User model from the user.model module
const User = require('../models/user.model'); 

/**
 * Create a new user in the database.
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<Object>} - The created user object.
 * @throws {Error} - Throws an error if the user creation fails.
 */
const createUser = async (userData) => {
  try {
    // Attempt to create a new user with the provided data
    return await User.create(userData);
  } catch (error) {
    // Throw an error if user creation fails
    throw new Error('Error creating user: ' + error.message);
  }
};

/**
 * Retrieve all users from the database.
 * @returns {Promise<Array>} - An array of user objects.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
const getAllUsers = async () => {
  try {
    // Attempt to retrieve all users from the database
    return await User.findAll();
  } catch (error) {
    // Throw an error if retrieval fails
    throw new Error('Error retrieving users: ' + error.message);
  }
};

/**
 * Retrieve a user by ID from the database.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
const getUserById = async (id) => {
  try {
    // Attempt to retrieve a user by its ID
    return await User.findByPk(id);
  } catch (error) {
    // Throw an error if retrieval fails
    throw new Error('Error retrieving user: ' + error.message);
  }
};

/**
 * Update a user by ID in the database.
 * @param {number} id - The ID of the user to update.
 * @param {Object} updateData - The data to update the user with.
 * @returns {Promise<Object|null>} - The updated user object if successful, otherwise null.
 * @throws {Error} - Throws an error if the update fails.
 */
const updateUserById = async (id, updateData) => {
  try {
    // Attempt to find the user by its ID
    const user = await User.findByPk(id);
    if (user) {
      // Update the user with the provided data
      return await user.update(updateData);
    }
    return null; // Return null if the user was not found
  } catch (error) {
    // Throw an error if the update fails
    throw new Error('Error updating user: ' + error.message);
  }
};

/**
 * Delete a user by ID from the database.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<number>} - The number of rows affected (should be 1 if successful).
 * @throws {Error} - Throws an error if the deletion fails.
 */
const deleteUserById = async (id) => {
  try {
    // Attempt to delete the user with the specified ID
    return await User.destroy({ where: { id } });
  } catch (error) {
    // Throw an error if the deletion fails
    throw new Error('Error deleting user: ' + error.message);
  }
};

// Export the CRUD functions for use in other modules
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
