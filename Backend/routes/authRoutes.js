const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/reset-password/initiate', authController.initiatePasswordReset);
router.post('/reset-password/confirm', authController.confirmPasswordReset);
router.post('/change-password', authController.changePassword);

module.exports = router;