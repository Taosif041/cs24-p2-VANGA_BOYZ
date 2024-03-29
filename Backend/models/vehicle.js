const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: ["Open Truck", "Dump Truck", "Compactor", "Container Carrier"],
    required: true,
  },
  capacity: {
    type: Number,
    enum: [3, 5, 7, 15],
    required: true,
  },
  fuelCostPerKmLoaded: {
    type: Number,
    required: true,
  },
  fuelCostPerKmUnloaded: {
    type: Number,
    required: true,
  },
  stsID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["inSts", "goingToLandfill", "inLandfill", "returningToSts"],
    default: "inSts",
  },
  usage: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
