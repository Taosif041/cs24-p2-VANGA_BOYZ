const Role = require('./models/Role');
const Permission = require('./models/Permission');

async function initializeDB() {
  try {
    // Define permissions
    const permissions = [
      'Add/Remove Users',
      'Assign/Unassign Roles to Users',
      'Create/Edit/Delete Roles',
      'Add Permissions to Roles',
      'Assign/Unassign Managers to STS and Landfills',
      'Add/Remove STS and Landfills',
      'Add/Remove Vehicles',
      'Manage Oil Consumption Data',
      'Log vehicle arrivals and departures including mileage'
    ];

    // Create permissions in the database
    const createdPermissions = await Permission.insertMany(permissions.map(name => ({ name })));

    // Define roles and their permissions
    const roles = [
      {
        name: 'System Admin',
        permissions: createdPermissions.slice(0, 8).map(p => p._id) // First 8 permissions
      },
      {
        name: 'STS Manager',
        permissions: [createdPermissions[8]._id] // Last permission
      },
      {
        name: 'Landfill Manager',
        permissions: [createdPermissions[8]._id] // Last permission
      }
    ];

    // Create roles in the database
    await Role.insertMany(roles.map(({ name, permissions }) => ({ roleName: name, permissions })));

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database', error);
  }
}

module.exports = initializeDB;