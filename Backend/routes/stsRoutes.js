const express = require('express');
const router = express.Router();
const stsController = require('../controllers/stsController');

router.post('/', stsController.createSTS);
router.get('/', stsController.getAllSTSs);
router.get('/:stsId', stsController.getSTS);
router.put('/:stsId', stsController.updateSTS);
router.delete('/:stsId', stsController.deleteSTS);
router.post('/:stsId/managers', stsController.addManager);
router.delete('/:stsId/managers', stsController.deleteManager);
router.get('/:stsId/managers', stsController.getManagers);
router.get('/:stsId/vehicles', stsController.getVehicles);

// Add a vehicle
router.post('/:stsId/vehicles', stsController.addVehicle);

// Delete a vehicle
router.delete('/:stsId/vehicles', stsController.deleteVehicle);

module.exports = router;