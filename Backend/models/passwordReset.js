// src/models/PasswordReset.js

const mongoose = require('mongoose');

const PasswordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // this document will automatically delete itself after 10 minutes
  },
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);