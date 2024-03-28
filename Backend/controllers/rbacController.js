const Role = require('../models/role');
const Permission = require('../models/permission');

// Controller function for getting all roles
// Controller function for getting all roles
async function getRoles(req, res) {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Controller function for getting all permissions

async function getPermissions(req, res) {
    try {
        const permissions = await Permission.find();
        res.status(200).json(permissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Controller function for getting a specific role
async function getRole(req, res) {
    try {
        const role = await Role.findById(req.params.roleId);
        if (role == null) {
            res.status(404).json({ message: 'Cannot find role' });
        } else {
            res.status(200).json(role);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
  getRoles,
  getPermissions,
  getRole
};