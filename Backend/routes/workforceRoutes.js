const express = require('express');
const router = express.Router();
const workforceController = require('../controllers/workforceController');

// GET all workforce
router.get('/', workforceController.getAllWorkforce);

// POST new workforce
router.post('/', workforceController.createWorkforce);

// GET one workforce by ID
//router.get('/:workforceId', workforceController.getWorkforce);

// DELETE one workforce by ID
router.delete('/:workforceId', workforceController.deleteWorkforce);

module.exports = router;
