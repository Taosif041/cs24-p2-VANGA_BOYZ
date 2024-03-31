const mongoose = require("mongoose");
const PermissionSchema = require("./permission").schema;

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    null: true
  },
  permissions: [PermissionSchema],
});

module.exports = mongoose.model("Role", RoleSchema);
