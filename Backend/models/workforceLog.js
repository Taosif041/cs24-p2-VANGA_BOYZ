const mongoose = require('mongoose');

const WorkforceLogSchema = new mongoose.Schema({
  workforceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Workforce'
  },
  date: {
    type: Date,
    default: Date.now
  },
  loginTime: {
    type: Date
  },
  logoutTime: {
    type: Date
  },
  totalHoursWorked: {
    type: Number
  },
  overtimeHours: {
    type: Number,
    default: 0
  },
  absences: {
    type: Boolean,
    default: false
  },
  leaves: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('WorkforceLog', WorkforceLogSchema);
