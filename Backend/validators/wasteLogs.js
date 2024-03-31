const Joi = require('joi');

const wasteTransferLogValidation = (data) => {
    const schema = Joi.object({
        vehicleId: Joi.string().required(),
        stsId: Joi.string().required(),
        landfillId: Joi.string().required(),
        stsManagerId: Joi.string(),
        landfillManagerId: Joi.string(),
        weightOfWaste: Joi.number().required(),
        stsDepartureTime: Joi.date(),
        landfillArrivalTime: Joi.date(),
        stsArrivalTime: Joi.date(),
        landfillDepartureTimetoSts: Joi.date(),
        status: Joi.string(),
        distance: Joi.number().required(),
        date: Joi.date(),
        oilComsumed: Joi.number(),
    });

    return schema.validate(data);
};

module.exports = wasteTransferLogValidation;
