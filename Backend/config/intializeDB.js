const Role = require('../models/role');
const Permission = require('../models/permission');
const connectDB = require('./db');

async function initializeDB() {
  try {
    connectDB();
    await Promise.all([
      Role.deleteMany({}),
      Permission.deleteMany({})
    ]);

    const permissions = [
      'Add/Remove Users',
      'Assign/Unassign Roles to Users',
      'Create/Edit/Delete Roles',
      'Add Permissions to Roles',
      'Assign/Unassign Managers to STS and Landfills',
      'Add/Remove STS and Landfills',
      'Add/Remove Vehicles',
      'Manage Oil Consumption Data',
      'Log vehicle arrivals and departures including mileage',
      'Add workforce',
      'Entry workforce arrival/departure',
    ];

    const createdPermissions = await Promise.all(
      permissions.map(name => new Permission({ type: name }).save())
    );

    const roles = [
      {
        name: 'System Admin',
        permissions: createdPermissions.slice(0, 8)
      },
      {
        name: 'STS Manager',
        permissions: [createdPermissions[8]]
      },
      {
        name: 'Landfill Manager',
        permissions: [createdPermissions[8]]
      },
      {
        name:'Contractor Manager',
        permissions: createdPermissions.slice(9, 11)
      }
    ];

    await Promise.all(
      roles.map(({ name, permissions }) => new Role({ roleName: name, permissions }).save())
    );

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database', error);
  }
}

initializeDB();

module.exports = initializeDB;