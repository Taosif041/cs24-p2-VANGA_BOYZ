const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SharingPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'HouseholdUser',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotePerson: [{
    type: Schema.Types.ObjectId,
    ref: 'HouseholdUser',
  }],
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SharingPost', SharingPostSchema);
