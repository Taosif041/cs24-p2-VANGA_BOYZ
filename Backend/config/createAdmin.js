const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require('../models/role');
const connectDB = require('./db');
require('dotenv').config({path: '../.env'});

async function createAdmin() {
  try {
    await connectDB();
    await Promise.all([
      User.deleteMany({})
      
    ]);

    // Find the System Admin role
    const systemAdminRole = await Role.findOne({ roleName: 'System Admin' });

    if (!systemAdminRole) {
      console.error('System Admin role not found');
      return;
    }

    // Hash the password
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash('password', saltRounds);

    // Create a new user with the System Admin role
    const adminUser = new User({
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      roles: [systemAdminRole],
      // Add other fields as necessary
    });

    await adminUser.save();

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Failed to create admin user', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

createAdmin();