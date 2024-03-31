const mongoose = require('mongoose');

const wasteTransferLogSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    stsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'STS',
        required: true,
    },
    landfillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landfill',
        required: true,
    },
    stsManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    landfillManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    weightOfWaste: {
        type: Number,
        required: true,
    },
    stsDepartureTime: {
        type: Date,
        required: false,
    },
    landfillArrivalTime: {
        type: Date,
        required: false,
    },
    stsArrivalTime: {
        type: Date,
        required: false,
    },
    landfillDepartureTimetoSts: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        enum: ["inSts", "goingToLandfill", "inLandfill", "returningToSts"],
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    oilConsumed: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('WasteTransferLog', wasteTransferLogSchema);
