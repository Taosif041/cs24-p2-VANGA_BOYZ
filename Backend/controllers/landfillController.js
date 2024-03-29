const LandfillManager = require("../models/landfillManager"); // Import the LandfillManager model
const User = require("../models/user"); // Import the User model
const Landfill = require("../models/landfill"); // Import the Landfill model
const landfillValidator = require("../validators/landfill"); // Import the landfill validator

exports.createLandfill = async (req, res) => {
  try {
    // Validate the request data
    const { error } = landfillValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new landfill
    const newLandfill = new Landfill(req.body);

    // Save the new landfill to the database
    const savedLandfill = await newLandfill.save();

    // Return the saved landfill
    return res.status(201).json(savedLandfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllLandfills = async (req, res) => {
  try {
    // Retrieve all landfills from the database
    const landfills = await Landfill.find();

    // Return the list of landfills
    return res.status(200).json(landfills);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getLandfill = async (req, res) => {
  try {
    // Retrieve the landfill with the given ID from the database
    const landfill = await Landfill.findById(req.params.landfillId);

    // If the landfill is not found, return a 404 status code
    if (!landfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    // Return the landfill
    return res.status(200).json(landfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateLandfill = async (req, res) => {
  try {
    // Validate the request data
    const { error } = landfillValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Update the landfill with the given ID
    const updatedLandfill = await Landfill.findByIdAndUpdate(
      req.params.landfillId,
      req.body,
      { new: true } // This option returns the updated document
    );

    // If the landfill is not found, return a 404 status code
    if (!updatedLandfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    // Return the updated landfill
    return res.status(200).json(updatedLandfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteLandfill = async (req, res) => {
  try {
    // Delete the landfill with the given ID
    const deletedLandfill = await Landfill.findByIdAndDelete(
      req.params.landfillId
    );

    // If the landfill is not found, return a 404 status code
    if (!deletedLandfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    // Delete all associated landfill managers
    const deletedManagers = await LandfillManager.deleteMany({
      landfillId: req.params.landfillId,
    });

    // Update the User model for the associated managers
    await User.updateMany(
      { _id: { $in: deletedManagers.map((manager) => manager.userID) } },
      { $set: { sts: {} } }
    );

    // Return a success message
    return res
      .status(200)
      .json({
        message: "Landfill and associated managers deleted successfully",
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.assignManagers = async (req, res) => {
  const { userIDs } = req.body;

  // Check all userIDs exist
  const users = await User.find({ _id: { $in: userIDs } });
  if (users.length !== userIDs.length) {
    return res.status(400).json({ message: "Some userIDs do not exist" });
  }

  try {
    const landfill = await Landfill.findById(req.params.landfillId);
    if (landfill == null) {
      return res.status(404).json({ message: "Cannot find Landfill" });
    }

    // Create a copy of the Landfill object without the managers field
    const landfillForUser = { ...landfill._doc, managers: undefined };

    // Find out who are newly assigned and who are deleted
    const newManagers = userIDs.filter((id) => !landfill.managers.includes(id));
    const deletedManagers = landfill.managers.filter(
      (id) => !userIDs.includes(id)
    );

    // Add new managers to LandfillManager model and update User model
    const addManagerPromises = newManagers.map(async (id) => {
      await LandfillManager.deleteOne({ userID: id });
      const newLandfillManager = new LandfillManager({
        userID: id,
        landfillId: landfill._id,
      });
      await newLandfillManager.save();
      return User.updateOne({ _id: id }, { landfill: landfillForUser });
    });

    // Remove deleted managers from LandfillManager model and update User model
    const deleteManagerPromises = deletedManagers.map(async (id) => {
      await LandfillManager.deleteOne({ userID: id, landfillId: landfill._id });
      return User.updateOne({ _id: id }, { landfill: null });
    });

    // Wait for all promises to complete
    await Promise.all([...addManagerPromises, ...deleteManagerPromises]);

    // Assign userIDs to the managers array
    landfill.managers = userIDs;
    const updatedLandfill = await landfill.save();

    res.status(200).json(updatedLandfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.addEntry = async (req, res) => {
  // TODO: Implement the logic for adding an entry of truck dumping at the landfill site
};
exports.receiveTruck = async (req, res) => {
  // TODO: Implement the logic for receiving a truck at a landfill site
};
