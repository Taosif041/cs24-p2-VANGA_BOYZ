const express = require('express');
const router = express.Router();

// Import your controllers here
const appHandleController = require('../controllers/appHandleController');

router.post('/notification', appHandleController.createNotification);
router.get('/issue', appHandleController.getIssues);

module.exports = router;
