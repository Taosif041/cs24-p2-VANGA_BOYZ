const express = require('express');
const router = express.Router();
const stsController = require('../controllers/stsController');

router.post('/', stsController.createSTS);
router.get('/', stsController.getAllSTSs);
router.get('/:stsId', stsController.getSTS);
router.put('/:stsId', stsController.updateSTS);
router.delete('/:stsId', stsController.deleteSTS);
router.get('/sts/:stsId/vehicles', stsController.getVehicles);
router.post('/:stsId/manager', stsController.assignManagerToSTS);
router.post('/:stsId/truck', stsController.assignTruckToSTS);
//router.post('/:stsId/entry', stsController.addVehicleEntry);
//router.post('/:stsId/recieve', stsController.recieveVehicleEntry);

module.exports = router;