const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
