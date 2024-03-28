const express = require('express');

const router = express.Router();

const {
    addVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicleController');

router.post('/', addVehicle);
router.get('/', getVehicles);
router.get('/:vehicleId', getVehicle);
router.put('/:vehicleId', updateVehicle);
router.delete('/:vehicleId', deleteVehicle);

module.exports = router;
