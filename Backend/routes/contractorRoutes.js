const express = require('express');
const router = express.Router();

const contractorController = require('../controllers/contractorController');

// Create a new contractor
router.post('/', contractorController.createContractor);

// Get all contractors
router.get('/', contractorController.getAllContractors);

// Get a contractor by ID
router.get('/:contractorId', contractorController.getContractor);

// Update a contractor by ID
//router.put('/:contractorId', contractorController.updateContractor);

// Delete a contractor by ID
router.delete('/:contractorId', contractorController.deleteContractor);


module.exports = router;