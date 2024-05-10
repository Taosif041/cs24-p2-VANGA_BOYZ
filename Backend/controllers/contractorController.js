const ThirdPartyContractor = require("../models/contractor");
const STS = require("../models/sts"); // Import the STS model

exports.createContractor = async (req, res) => {
  // Validate the request body against the schema
  const { error } = contractorValidationSchema.validate(req.body);

  if (error) {
    // If validation fails, send a 400 Bad Request response with the validation error message
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Find the STS with the given designatedSTS
    const sts = await STS.findById(req.body.designatedSTS);

    if (!sts) {
      return res.status(404).json({ message: "STS not found" });
    }

    // Create a new contractor with designatedSTS set to the _id of the found STS
    const contractor = new ThirdPartyContractor({
      ...req.body,
      areaOfCollection: sts.wardNumber,
    });

    const savedContractor = await contractor.save();
    res.status(201).json(savedContractor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllContractors = async (req, res) => {
  try {
    const contractors = await ThirdPartyContractor.find();
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getContractor = async (req, res) => {
  try {
    const contractor = await ThirdPartyContractor.findById(
      req.params.contractorId
    );
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json(contractor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteContractor = async (req, res) => {
  try {
    const contractor = await ThirdPartyContractor.findByIdAndRemove(
      req.params.contractorId
    );
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json({ message: "Contractor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
