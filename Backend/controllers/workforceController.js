const Workforce = require('../models/workforce');
const Contractor = require('../models/contractor');

exports.getAllWorkforce = async (req, res) => {
    try {
      const workforce = await Workforce.find();
      res.status(200).json(workforce);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createWorkforce = async (req, res) => {
  const newWorkforce = new Workforce(req.body);

  try {
    const contractor = await Contractor.findById(req.body.contractorId);
    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    newWorkforce.assignedCollectionRoute = contractor.areaOfCollection;

    const workforce = await newWorkforce.save();
    res.status(201).json(workforce);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteWorkforce = async (req, res) => {
    try {
      const result = await Workforce.deleteOne({ _id: req.params.workforceId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Workforce not found' });
      }
      res.status(200).json({ message: 'Workforce deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  