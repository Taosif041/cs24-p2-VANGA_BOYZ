const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  fuelCostPerKmLoaded: {
    type: Number,
    required: true
  },
  fuelCostPerKmUnloaded: {
    type: Number,
    required: true
  },
  stsID: {
    type: String
  
  },
  status: {
    type: String,
    enum: ['inSts', 'goingToLandfill', 'inLandfill', 'returningToSts'],
  
  }
  // Additional attributes as necessary
});

module.exports = mongoose.model('Vehicle', VehicleSchema);