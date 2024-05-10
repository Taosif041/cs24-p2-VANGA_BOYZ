const mongoose = require('mongoose');

const ThirdPartyContractorSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  }, 
  registrationId: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    required: true
  },
  tin: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  workforceSize: {
    type: Number,
    required: true
  },
  paymentPerTonnageOfWaste: {
    type: Number,
    required: true
  },
  requiredAmountOfWastePerDay: {
    type: Number,
    required: true
  },
  contractDuration: {
    type: Number,
    required: true
  },
  areaOfCollection: {
    type: String,
    required: true
  },
  designatedSTS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'STS'
  }
});

module.exports = mongoose.model('ThirdPartyContractor', ThirdPartyContractorSchema);
