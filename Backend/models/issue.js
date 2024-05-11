const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  householdUserId: {
    type: Schema.Types.ObjectId,
    ref: 'HouseholdUser',
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Issue', IssueSchema);
