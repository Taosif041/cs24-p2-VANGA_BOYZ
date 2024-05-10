const mongoose = require('mongoose');

const STSSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  wardNumber: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  compensationFinePerTon:{
    type: Number,
    required:true
  },
  gpsCoordinates: {
    type: [Number], // Change the type to an array of Numbers
    required: true
  },
  managers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  assignedTrucks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }]
});

const STS = mongoose.model('STS', STSSchema);

module.exports = STS;