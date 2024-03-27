const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: String
});

module.exports = mongoose.model('Permission', PermissionSchema);