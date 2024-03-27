const mongoose = require('mongoose');
const PermissionSchema = require('./permissions').schema;

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true
  },
  permissions: [PermissionSchema]
});

module.exports = mongoose.model('Role', RoleSchema);