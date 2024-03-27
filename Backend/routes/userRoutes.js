const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.listAllUsers);
router.post('/', userController.createUser);
router.get('/roles', userController.listAllRoles);
router.get('/:userId', userController.getUserDetails);
router.put('/:userId', userController.updateUserDetails);
router.delete('/:userId', userController.deleteUser);
router.post('/:userId/roles', userController.updateUserRoles);

module.exports = router;
