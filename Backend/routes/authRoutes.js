const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
//router.post('/logout', authController.logout);
router.post('/reset-password/initiate', authController.initiatePasswordReset);
router.post('/reset-password/confirm', authController.confirmPasswordReset);
router.post('/reset-password/change-password', authMiddleware,authController.changePasswordInPasswordReset);
router.post('/change-password',authMiddleware ,authController.changePassword);

module.exports = router;