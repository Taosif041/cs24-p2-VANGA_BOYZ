const mongoose = require('mongoose');
const { Schema } = mongoose;

const LandfillSchema = new Schema({
  LandfillName: {
    type: String,
    required: true,
    unique: true
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
  managers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }]
});

module.exports = mongoose.model('Landfill', LandfillSchema);