const mongoose = require('mongoose');

const PrimaryWasteLogSchema = new mongoose.Schema({
  collectionDateTime: {
    type: Date,
    required: true
  },
  amountOfWasteCollected: {
    type: Number,
    required: true
  },
  contractorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ThirdPartyContractor'
  },
  typeOfWasteCollected: {
    type: String,
    enum: ['Domestic', 'Plastic', 'Construction'],
    required: true
  },
  designatedSTS: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'STS'
  },
  vehicleUsed: {
    type: String,
    enum: ['Van', 'Mini Truck'],
    required: true
  }
});

module.exports = mongoose.model('PrimaryWasteLog', PrimaryWasteLogSchema);
