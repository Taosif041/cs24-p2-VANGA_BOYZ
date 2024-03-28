const STS = require("../models/sts");
const STSValidator = require("../validators/sts");
const User = require("../models/user");
const STSManager = require("../models/stsManager");
const Vehicle = require("../models/vehicle");

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

exports.deleteSTS = async (req, res) => {
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
        user.sts = undefined;
        return user.save();
      }
    });
    await Promise.all(updatePromises);

    // Delete the STS
    await sts.remove();

    res.status(200).json({ message: "Deleted STS" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.assignManagersToSTS = async (req, res) => {
  const { userIDs } = req.body;

  // Check all userIDs exist
  const users = await User.find({ _id: { $in: userIDs } });
  if (users.length !== userIDs.length) {
    return res.status(400).json({ message: 'Some userIDs do not exist' });
  }

  try {
    const sts = await STS.findById(req.params.stsId);
    if (sts == null) {
      return res.status(404).json({ message: 'Cannot find STS' });
    }

    // Create a copy of the STS object without the managers and assignedTrucks fields
    const stsForUser = { ...sts._doc, managers: undefined, assignedTrucks: undefined };

    // Find out who are newly assigned and who are deleted
    const newManagers = userIDs.filter(id => !sts.managers.includes(id));
    const deletedManagers = sts.managers.filter(id => !userIDs.includes(id));

    // Add new managers to STSManager model and update User model
    const addManagerPromises = newManagers.map(async id => {
      await STSManager.deleteOne({ userID: id });
      const newSTSManager = new STSManager({ userID: id, stsId: sts._id });
      await newSTSManager.save();
      return User.updateOne({ _id: id }, { sts: stsForUser });
    });

    // Remove deleted managers from STSManager model and update User model
    const deleteManagerPromises = deletedManagers.map(async id => {
      await STSManager.deleteOne({ userID: id, stsId: sts._id });
      return User.updateOne({ _id: id }, { sts: null });
    });

    // Wait for all promises to complete
    await Promise.all([...addManagerPromises, ...deleteManagerPromises]);

    // Assign userIDs to the managers array
    sts.managers = userIDs;
    const updatedSTS = await sts.save();

    res.status(200).json(updatedSTS);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.assignTruckToSTS = async (req, res) => {
  const { vehicleIDs } = req.body;

  // Check if all vehicleIDs exist
  const vehicles = await Vehicle.find({ _id: { $in: vehicleIDs } });
  if (vehicles.length !== vehicleIDs.length) {
    return res.status(400).json({ message: "Some vehicleIDs do not exist" });
  }

  try {
    const sts = await STS.findById(req.params.stsId);
    if (sts == null) {
      return res.status(404).json({ message: "Cannot find STS" });
    }

    // Find out who are newly assigned and who are deleted
    const newVehicles = vehicleIDs.filter((id) => !sts.vehicles.includes(id));
    const deletedVehicles = sts.vehicles.filter(
      (id) => !vehicleIDs.includes(id)
    );

    // Add new vehicles to STS
    const addVehiclePromises = newVehicles.map(async (vehicleID) => {
      return Vehicle.updateOne({ _id: vehicleID }, { stsID: sts._id });
    });

    // Remove deleted vehicles from STS
    const deleteVehiclePromises = deletedVehicles.map(async (vehicleID) => {
      return Vehicle.updateOne({ _id: vehicleID }, { stsID: null });
    });

    // Wait for all promises to complete
    await Promise.all([...addVehiclePromises, ...deleteVehiclePromises]);

    // Assign vehicleIDs to the vehicles array
    sts.vehicles = vehicleIDs;
    const updatedSTS = await sts.save();

    res.status(200).json(updatedSTS);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addVehicleEntry = async (req, res) => {
  // TODO: Implement the function
};
