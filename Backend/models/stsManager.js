const mongoose = require('mongoose');

const STSManagerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'STS',
    required: true
  }
});

module.exports = mongoose.model('STSManager', STSManagerSchema);