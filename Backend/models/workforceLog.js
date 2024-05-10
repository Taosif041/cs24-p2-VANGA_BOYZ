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
    type: Date,
    default:null
  },
  logoutTime: {
    type: Date,
    default:null
  },
  totalHoursWorked: {
    type: Number
  },
  overtimeHours: {
    type: Number,
    default: 0
  },
  
  leave: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('WorkforceLog', WorkforceLogSchema);
