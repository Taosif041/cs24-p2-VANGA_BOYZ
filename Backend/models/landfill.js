const mongoose = require('mongoose');

const LandfillSchema = new mongoose.Schema({
  LandfillName: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  operationalTimespan: {
    type: String,
    required: true
  },
  gpsCoordinates: {
    type: [Number],
    required: true
  },
  managers: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Landfill', LandfillSchema);