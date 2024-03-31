const LandfillManager = require("../models/landfillManager");
const User = require("../models/user");
const Landfill = require("../models/landfill");
const landfillValidator = require("../validators/landfill");
const STS = require("../models/sts"); 
const STSManager = require("../models/stsManager");

exports.createLandfill = async (req, res) => {
  try {
    const { error } = landfillValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newLandfill = new Landfill(req.body);

    const savedLandfill = await newLandfill.save();

    return res.status(201).json(savedLandfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllLandfills = async (req, res) => {
  try {
    const landfills = await Landfill.find();

    return res.status(200).json(landfills);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getLandfill = async (req, res) => {
  try {
    const landfill = await Landfill.findById(req.params.landfillId);

    if (!landfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    return res.status(200).json(landfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateLandfill = async (req, res) => {
  try {
    const { error } = landfillValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedLandfill = await Landfill.findByIdAndUpdate(
      req.params.landfillId,
      req.body,
      { new: true }
    );

    if (!updatedLandfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    return res.status(200).json(updatedLandfill);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteLandfill = async (req, res) => {
  try {
    const deletedLandfill = await Landfill.findByIdAndDelete(req.params.landfillId);

    if (!deletedLandfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    // First find the managers
    const managers = await LandfillManager.find({ landfillId: req.params.landfillId });

    // Then delete them
    await LandfillManager.deleteMany({ landfillId: req.params.landfillId });

    await User.updateMany(
      { _id: { $in: managers.map((manager) => manager.userID) } },
      { $set: { landfill: null } }
    );

    return res
      .status(200)
      .json({
        message: "Landfill deleted successfully and associated managers have been unassigned.",
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getManagers = async (req, res) => {
  try {
    const landfill = await Landfill.findById(req.params.landfillId).populate({
      path: 'managers',
      select: '-password'
    });
    if (!landfill) return res.status(404).json({ message: 'Cannot find landfill' });

    res.status(200).json(landfill.managers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addManager = async (req, res) => {
  try {
    const { managerId } = req.body;
    if (!managerId) throw new Error('Manager is required');

    const manager = await User.findById(managerId);
    if (!manager) return res.status(400).json({ message: "Manager not found" });

    let landfill = await Landfill.findById(req.params.landfillId);
    if (!landfill) return res.status(404).json({ message: 'Cannot find landfill' });

    if (landfill.managers.includes(managerId)) {
      return res.status(400).json({ message: 'Manager already assigned to this landfill' });
    }

    if (manager.sts || manager.landfill) {
      if (manager.sts) {
        const sts = await STS.findById(manager.sts._id);
        if (sts) {
          sts.managers.pull(manager._id);
          await sts.save();
          await STSManager.deleteOne({ userID: manager._id, stsId: sts._id });
        }
        manager.sts = null;
      }

      if (manager.landfill) {
        const otherLandfill = await Landfill.findById(manager.landfill._id);
        if (otherLandfill) {
          otherLandfill.managers.pull(manager._id);
          await otherLandfill.save();
          await LandfillManager.deleteOne({ userID: manager._id, landfillId: otherLandfill._id });
        }
        manager.landfill = null;
      }

      await manager.save();
    }

    landfill.managers.push(manager._id);
    await landfill.save();

    const landfillManager = new LandfillManager({ userID: manager._id, landfillId: landfill._id });
    await landfillManager.save();

    // Remove the managers field from the landfill object
    const { managers, ...landfillWithoutManagers } = landfill._doc;
    manager.landfill = landfillWithoutManagers;
    await manager.save();

    res.status(200).json(landfill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteManager = async (req, res) => {
  try {
    const { managerId } = req.body;
    if (!managerId) throw new Error('Manager is required');

    const manager = await User.findById(managerId);
    if (!manager) return res.status(400).json({ message: "Manager not found" });

    const landfill = await Landfill.findById(req.params.landfillId);
    if (!landfill) return res.status(404).json({ message: 'Cannot find landfill' });

    if (manager.landfill._id.toString() !== landfill._id.toString()) {
      return res.status(400).json({ message: 'Manager is not assigned to this landfill' });
    }

    landfill.managers.pull(manager._id);
    await landfill.save();

    await LandfillManager.deleteOne({ userID: manager._id, landfillId: landfill._id });

    manager.landfill = null;
    await manager.save();

    res.status(200).json(landfill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addEntry = async (req, res) => {
  // TODO: Implement the logic for adding an entry of truck dumping at the landfill site
};

exports.receiveTruck = async (req, res) => {
  // TODO: Implement the logic for receiving a truck at a landfill site
};
