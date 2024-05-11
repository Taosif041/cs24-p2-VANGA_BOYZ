const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunityPostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'HouseholdUser',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likedPerson: [{
    type: Schema.Types.ObjectId,
    ref: 'HouseholdUser',
  }],
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);
