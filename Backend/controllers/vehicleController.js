const Vehicle = require('../models/vehicle');
const VehicleValidator = require('../validators/vehicle');

// Controller function for adding a new vehicle

async function addVehicle(req, res) {
  const { error } = VehicleValidator.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


// Controller function for retrieving all vehicles
async function getVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller function for retrieving a specific vehicle
async function getVehicle(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (vehicle == null) {
      return res.status(404).json({ message: 'Cannot find vehicle' });
    }
    res.status(200).json(vehicle);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


// Controller function for updating a specific vehicle
async function updateVehicle(req, res) {
  const { error } = VehicleValidator.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, req.body, { new: true });
    if (updatedVehicle == null) {
      return res.status(404).json({ message: 'Cannot find vehicle' });
    }
    res.status(200).json(updatedVehicle);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Controller function for removing a specific vehicle
// Controller function for removing a specific vehicle
async function deleteVehicle(req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (vehicle == null) {
      return res.status(204).json({ message: 'Cannot find vehicle' });
    }
    await vehicle.deleteOne();
    res.status(200).json({ message: 'Deleted Vehicle' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle
};