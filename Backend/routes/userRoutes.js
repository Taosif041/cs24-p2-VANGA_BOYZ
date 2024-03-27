const express = require('express');
const router = express.Router();
const userController = require('./userController'); // Assuming you have a userController

// GET method for listing all users (System Admin access)
router.get('/', userController.listAllUsers);

// GET method for retrieving a specific user's details
router.get('/:userId', userController.getUserDetails);

// POST method for creating a new user (System Admin access)
router.post('/', userController.createUser);

// PUT method for updating a user's details (restricted to own details or System Admin access)
router.put('/:userId', userController.updateUserDetails);

// DELETE method for deleting a user (System Admin access)
router.delete('/:userId', userController.deleteUser);

// GET method for listing all available roles
router.get('/roles', userController.listAllRoles);

// PUT method for updating a user's roles (System Admin access)
router.put('/:userId/roles', userController.updateUserRoles);

module.exports = router;