const express = require('express');

const router = express.Router();

const {
    getRoles,
    getPermissions,
    getRole
} = require('../controllers/rbacController');

router.get('/roles', getRoles);
router.get('/permissions', getPermissions);
router.get('/roles/:roleId', getRole);

module.exports = router;
