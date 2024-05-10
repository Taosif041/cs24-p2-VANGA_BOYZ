const mongoose = require('mongoose');

const WorkforceSchema = new mongoose.Schema({
  
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  dateOfHire: {
    type: Date,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  paymentRatePerHour: {
    type: Number,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  contractorId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ThirdPartyContractor'
  },

  assignedCollectionRoute: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Workforce', WorkforceSchema);
