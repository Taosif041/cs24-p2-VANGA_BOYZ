const mongoose = require('mongoose');

const LandfillManagerSchema = new mongoose.Schema({ 
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  landfillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landfill', required: true } 
});

module.exports = mongoose.model('LandfillManager', LandfillManagerSchema);