const STS = require("../models/sts");
const STSValidator = require("../validators/sts");
const User = require("../models/user");
const STSManager = require("../models/stsManager");
const Vehicle = require("../models/vehicle");
const LandfillManager = require("../models/landfillManager");
const Landfill = require("../models/landfill");

exports.createSTS = async (req, res) => {
  const { error } = STSValidator.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const sts = new STS(req.body);
  try {
    const newSTS = await sts.save();
    res.status(201).json(newSTS);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllSTSs = async (req, res) => {
  try {
    const allSTSs = await STS.find();
    res.status(200).json(allSTSs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSTS = async (req, res) => {
  try {
    const sts = await STS.findById(req.params.stsId);
    if (sts == null) {
      return res.status(404).json({ message: "Cannot find STS" });
    }
    res.status(200).json(sts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateSTS = async (req, res) => {
  const { error } = STSValidator.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedSTS = await STS.findByIdAndUpdate(req.params.stsId, req.body, {
      new: true,
    });
    if (updatedSTS == null) {
      return res.status(404).json({ message: "Cannot find STS" });
    }
    res.status(200).json(updatedSTS);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteSTS = async (req, res) => { //edit needed
  try {
    const sts = await STS.findById(req.params.stsId);
    if (sts == null) {
      return res.status(404).json({ message: "Cannot find STS" });
    }

    // Delete all STSManager instances that belong to the STS
    const stsManagers = await STSManager.find({ stsId: sts._id });
    await STSManager.deleteMany({ stsId: sts._id });

    // Delete the sts field of the User of this STS
    const updatePromises = stsManagers.map(async (stsManager) => {
      const user = await User.findById(stsManager.userID);
      if (user.sts && user.sts._id.toString() === sts._id.toString()) {
        user.sts = null;
        return user.save();
      }
    });
    await Promise.all(updatePromises);

    // Delete the STS
    await sts.deleteOne();

    res.status(200).json({ message: "Deleted STS" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getManagers = async (req, res) => {
  try {
    const sts = await STS.findById(req.params.stsId);
    if (!sts) return res.status(404).json({ message: 'Cannot find STS' });

    const managers = await User.find({ _id: { $in: sts.managers } }).select('-password');

    res.status(200).json(managers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addManager = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) throw new Error('User is required');

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    
    const sts = await STS.findById(req.params.stsId);
    if (!sts) return res.status(404).json({ message: 'Cannot find STS' });
    // Find any existing STSManager for the user
    const existingSTSManager = await STSManager.findOne({ userID: userId });

    if (existingSTSManager) {
      // If found, remove the user from the previous STS's managers list
      const previousSTS = await STS.findById(existingSTSManager.stsId);
      if (previousSTS) {
        const index = previousSTS.managers.indexOf(userId);
        if (index > -1) {
          previousSTS.managers.splice(index, 1);
          await previousSTS.save();
        }
      }

      // Delete the existing STSManager
      await STSManager.findByIdAndDelete(existingSTSManager._id);
    }

    // Find any existing LandfillManager for the user
    const existingLandfillManager = await LandfillManager.findOne({ userID: userId });

    if (existingLandfillManager) {
      // If found, remove the user from the previous landfill's managers list
      const previousLandfill = await Landfill.findById(existingLandfillManager.landfillId);
      if (previousLandfill) {
        const index = previousLandfill.managers.indexOf(userId);
        if (index > -1) {
          previousLandfill.managers.splice(index, 1);
          await previousLandfill.save();
        }
      }

      // Delete the existing LandfillManager
      await LandfillManager.findByIdAndDelete(existingLandfillManager._id);
    }


    // Add the user to the new STS's managers list
    sts.managers.push(user._id);
    await sts.save();

    // Create a new STSManager for the user and the new STS
    const newSTSManager = new STSManager({ userID: userId, stsId: sts._id });
    await newSTSManager.save();

    // Update the sts field in the User model without the manager and assignedTruck fields
    const stsForUser = { ...sts._doc };
    delete stsForUser.managers;
    delete stsForUser.assignedTrucks;
    user.sts = stsForUser;
    user.landfill = null;
    await user.save();

    res.status(200).json(sts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteManager = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) throw new Error('User ID is required');

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const sts = await STS.findById(req.params.stsId);
    if (!sts) return res.status(404).json({ message: 'Cannot find STS' });

    const index = sts.managers.indexOf(user._id);
    if (index > -1) {
      sts.managers.splice(index, 1);
      await sts.save();
    }

    // Find the STSManager for the user and the STS
    const stsManager = await STSManager.findOne({ userID: userId, stsId: sts._id });

    if (stsManager) {
      // If found, delete the STSManager
      await STSManager.findByIdAndDelete(stsManager._id);
    }

    // Clear the sts field in the User model
    user.sts = null;
    await user.save();

    res.status(200).json(sts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getVehicles = async (req, res) => {
  try {
    const sts = await STS.findById(req.params.stsId);
    if (!sts) {
      return res.status(404).json({ message: 'Cannot find STS' });
    }

    let vehicles = await Vehicle.find({ stsID: req.params.stsId });

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Iterate over the vehicles to add today's usage data if it's not present
    vehicles = vehicles.map(vehicle => {
      const vehicleObj = vehicle.toObject();

      // Find the usage data for today
      const todaysUsageData = vehicleObj.usage.find(usage => {
        const usageDate = new Date(usage.date);
        usageDate.setHours(0, 0, 0, 0);
        return usageDate.getTime() === today.getTime();
      });

      // If today's usage data is not present, set todaysUsage to 0
      // Otherwise, set todaysUsage to the count for today
      vehicleObj.todaysUsage = todaysUsageData ? todaysUsageData.count : 0;

      // Remove the usage array
      delete vehicleObj.usage;

      return vehicleObj;
    });

    return res.status(200).json(vehicles);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const newStsId = mongoose.Types.ObjectId(req.params.stsId);

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(400).json({ message: "Vehicle not found" });
    
    const newSTS = await STS.findById(newStsId);
    if (!newSTS) return res.status(404).json({ message: 'Cannot find STS' });
    // If the vehicle is currently assigned to an STS
    if (vehicle.stsID) {
      // Find the current STS
      const currentSTS = await STS.findById(vehicle.stsID);
      if (currentSTS) {
        // Remove the vehicle from the current STS's assignedTrucks array
        const index = currentSTS.assignedTrucks.indexOf(vehicle._id);
        if (index > -1) {
          currentSTS.assignedTrucks.splice(index, 1);
          await currentSTS.save();
        }
      }
    }

  

    // Add the vehicle to the new STS's assignedTrucks array
    newSTS.assignedTrucks.push(vehicle._id);
    await newSTS.save();

    // Update the stsID field of the vehicle
    vehicle.stsID = newStsId;
    await vehicle.save();

    res.status(200).json(newSTS);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const stsId = mongoose.Types.ObjectId(req.params.stsId);

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(400).json({ message: "Vehicle not found" });

    const sts = await STS.findById(stsId);
    if (!sts) return res.status(404).json({ message: 'Cannot find STS' });

    // Check if the vehicle is assigned to the STS
    if (!sts.assignedTrucks.includes(vehicleId)) {
      return res.status(400).json({ message: 'Vehicle is not assigned to this STS' });
    }

    // Remove the vehicle from the STS's vehicles list
    const index = sts.assignedTrucks.indexOf(vehicle._id);
    if (index > -1) {
      sts.assignedTrucks.splice(index, 1);
      await sts.save();
    }

    // Set the stsID field of the vehicle to null
    vehicle.stsID = null;
    await vehicle.save();

    res.status(200).json(sts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addVehicleEntry = async (req, res) => {
  // TODO: Implement the function
};
