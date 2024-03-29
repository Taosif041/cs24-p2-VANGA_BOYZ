const mongoose = require('mongoose');
const RoleSchema = require('./role').schema;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
  
  },
  lastName: {
    type: String,
  
  },
  roles: {
    type: [RoleSchema],
    default: []
  },
  
  dateOfBirth: {
    type: Date,
   
  },
  phoneNumber: {
    type: String,
    
  },
  address: {
    type: String,
 
  },
  city: {
    type: String,
 
  },
  state: {
    type: String,
  
  },
  postalCode: {
    type: String,
   
  },
  country: {
    type: String,
    default: 'Bangladesh'

  },
  sts: {
    type: Object,
    default:{}
  
  },
  landfill: {
    type: Object,
    default:{}
  
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);