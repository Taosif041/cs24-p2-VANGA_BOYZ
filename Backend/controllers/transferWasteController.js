// controllers/transferWasteController.js
const WasteTransferLog = require("../models/wasteLogs");
const Vehicle = require("../models/vehicle"); // Assuming you have a Vehicle model
const STS = require("../models/sts"); // Assuming you have an STS model
const Landfill = require("../models/landfill"); // Assuming you have a Landfill model
const wasteTransferLogValidation = require("../validators/wasteLogs");
const vehicle = require("../models/vehicle");

exports.arrivalAtSTS = async (req, res) => {
  try {
    let wasteLog = await WasteTransferLog.findById(req.body.logId);
    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" });
    }

    wasteLog.status = "inSts";
    wasteLog.stsArrivalTime = new Date();
    let vehicle = await Vehicle.findById(wasteLog.vehicleId);
    vehicle.status = "inSts";
    await vehicle.save();

    wasteLog = await wasteLog.save();

    res.status(200).json({ message: "Vehicle arrived at STS", wasteLog });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.departureFromSTSToLandfill = async (req, res) => {
  try {
    const { error } = wasteTransferLogValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const sts = await STS.findById(req.body.stsId);
    if (!sts) {
      return res.status(404).json({ message: "STS not found" });
    }

    const landfill = await Landfill.findById(req.body.landfillId);
    if (!landfill) {
      return res.status(404).json({ message: "Landfill not found" });
    }

    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (req.body.weightOfWaste > vehicle.capacity) {
      return res
        .status(400)
        .json({ message: "Weight of waste is greater than vehicle capacity" });
    }

    let wasteLog = new WasteTransferLog(req.body);
    wasteLog.status = "goingToLandfill";
    vehicle.status = "goingToLandfill";
    const today = new Date().setHours(0, 0, 0, 0);
    wasteLog.date = new Date(today);
    const usageToday = vehicle.usage.find(
      (usage) => usage.date.getTime() === today
    );

    if (usageToday) {
      usageToday.count += 1;
    } else {
      vehicle.usage.push({
        date: new Date(today),
        count: 1,
      });
    }

    await vehicle.save();
    wasteLog.stsManagerId = req.user.id;

    wasteLog.stsDepartureTime = new Date();

    const loadDifference = req.body.weightOfWaste;
    const totalCapacity = vehicle.capacity;
    const cLoaded = vehicle.fuelCostPerKmLoaded;
    const cUnloaded = vehicle.fuelCostPerKmUnloaded;

    const cInterpolated =
      cUnloaded + (loadDifference / totalCapacity) * (cLoaded - cUnloaded);
    wasteLog.oilConsumed = cInterpolated * req.body.distance;

    wasteLog = await wasteLog.save();

    // wasteLog = await wasteLog.populate('vehicleId stsId landfillId stsManagerId').execPopulate();

    wasteLog = wasteLog.toJSON();
    wasteLog.vehicle = vehicle.toJSON();
    delete wasteLog.vehicleId;
    delete wasteLog.vehicle.usage;
    wasteLog.sts = sts.toJSON();
    delete wasteLog.stsId;
    delete wasteLog.sts.managers;
    delete wasteLog.sts.assignedTrucks;
    wasteLog.landfill = landfill.toJSON();
    delete wasteLog.landfillId;
    delete wasteLog.landfill.managers;

    delete wasteLog.stsManagerId;

    res.status(201).json(wasteLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.arrivalAtLandfill = async (req, res) => {
  try {
    let wasteLog = await WasteTransferLog.findById(req.body.logId);
    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" });
    }

    wasteLog.landfillManagerId = req.user.id;
    wasteLog.status = "inLandfill";
    let vehicle = await Vehicle.findById(wasteLog.vehicleId);
    vehicle.status = "inLandfill";
    await vehicle.save();
    wasteLog.landfillArrivalTime = new Date();

    wasteLog = await wasteLog.save();

    res.status(200).json({ message: "Vehicle arrived at landfill", wasteLog });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.departureFromLandfillToSTS = async (req, res) => {
  try {
    let wasteLog = await WasteTransferLog.findById(req.body.logId);
    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" });
    }

    wasteLog.status = "returningToSts";
    wasteLog.landfillDepartureTimetoSts = new Date();
    let vehicle = await Vehicle.findById(wasteLog.vehicleId);
    vehicle.status = "returningToSts";
    await vehicle.save();

    wasteLog = await wasteLog.save();

    res
      .status(200)
      .json({ message: "Vehicle departed from landfill to STS", wasteLog });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllWasteLogs = async (req, res) => {
  try {
    const { landfillID, stsID } = req.query;
    let query = {};

    if (landfillID) {
      query.landfillId = landfillID;
    }

    if (stsID) {
      query.stsId = stsID;
    }

    let wasteLogs = await WasteTransferLog.find(query);

    wasteLogs = await Promise.all(
      wasteLogs.map(async (wasteLog) => {
        // Fetch related documents
        const vehicle = await Vehicle.findById(wasteLog.vehicleId);
        const sts = await STS.findById(wasteLog.stsId);
        const landfill = await Landfill.findById(wasteLog.landfillId);
        
        // Transform the document
        wasteLog = wasteLog.toJSON();
        wasteLog.vehicle = vehicle ? vehicle.toJSON() : null;
        delete wasteLog.vehicleId;
        if (wasteLog.vehicle) {
          delete wasteLog.vehicle.usage;
        }
        wasteLog.sts = sts ? sts.toJSON() : null;
        delete wasteLog.stsId;
        if (wasteLog.sts) {
          delete wasteLog.sts.managers;
          delete wasteLog.sts.assignedTrucks;
        }
        wasteLog.landfill = landfill ? landfill.toJSON() : null;
        delete wasteLog.landfillId;
        if (wasteLog.landfill) {
          delete wasteLog.landfill.managers;
        }
        wasteLog.stsManager = stsManager ? stsManager.toJSON() : null;
        delete wasteLog.stsManagerId;

        return wasteLog;
      })
    );

    res.status(200).json(wasteLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.generateSlip = async (req, res) => {
  try {
    const { wasteLogId } = req.body;

    if (!wasteLogId) {
      return res.status(400).json({ message: "wasteLogId is required" });
    }

    // Fetch the wasteLog from the database using the wasteLogId
    const wasteLog = await WasteTransferLog.findById(wasteLogId);

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" });
    }

    // Fetch related documents
    const vehicle = await Vehicle.findById(wasteLog.vehicleId).select('registrationNumber type capacity');
    const sts = await STS.findById(wasteLog.stsId).select('name wardNumber gpsCoordinates');
    const landfill = await Landfill.findById(wasteLog.landfillId).select('LandfillName gpsCoordinates');

    // Generate the slip
    const slip = {
      landfill: {
        LandfillName: landfill ? landfill.LandfillName : null,
        gpsCoordinates: landfill ? landfill.gpsCoordinates : null,
      },
      sts: {
        name: sts ? sts.name : null,
        wardNumber: sts ? sts.wardNumber : null,
        gpsCoordinates: sts ? sts.gpsCoordinates : null,
      },
      vehicle: {
        registrationNumber: vehicle ? vehicle.registrationNumber : null,
        type: vehicle ? vehicle.type : null,
        capacity: vehicle ? vehicle.capacity : null,
      },
      weightOfWaste: wasteLog.weightOfWaste,
      status: wasteLog.status,
      distance: wasteLog.distance,
      date: wasteLog.date,
      oilConsumed: wasteLog.oilConsumed,
    };

    res.status(200).json({ slip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.generateSlip = async (req, res) => {
  try {
    const { wasteLogId } = req.body;

    if (!wasteLogId) {
      return res.status(400).json({ message: "wasteLogId is required" });
    }

    // Fetch the wasteLog from the database using the wasteLogId
    const wasteLog = await WasteTransferLog.findById(wasteLogId);

    if (!wasteLog) {
      return res.status(404).json({ message: "Waste log not found" });
    }

    // Fetch related documents
    const vehicle = await Vehicle.findById(wasteLog.vehicleId).select('registrationNumber type capacity');
    const sts = await STS.findById(wasteLog.stsId).select('name wardNumber gpsCoordinates');
    const landfill = await Landfill.findById(wasteLog.landfillId).select('LandfillName gpsCoordinates');

    // Generate the slip
    const slip = {
      landfill: {
        LandfillName: landfill ? landfill.LandfillName : null,
        gpsCoordinates: landfill ? landfill.gpsCoordinates : null,
      },
      sts: {
        name: sts ? sts.name : null,
        wardNumber: sts ? sts.wardNumber : null,
        gpsCoordinates: sts ? sts.gpsCoordinates : null,
      },
      vehicle: {
        registrationNumber: vehicle ? vehicle.registrationNumber : null,
        type: vehicle ? vehicle.type : null,
        capacity: vehicle ? vehicle.capacity : null,
      },
      weightOfWaste: wasteLog.weightOfWaste,
      status: wasteLog.status,
      distance: wasteLog.distance,
      date: wasteLog.date,
      oilConsumed: wasteLog.oilConsumed,
    };

    res.status(200).json({ slip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};