const express = require('express');
const router = express.Router();
const stsController = require('../controllers/stsController');

router.post('/', stsController.createSTS);
router.get('/', stsController.getAllSTSs);
router.get('/:stsId', stsController.getSTS);
router.put('/:stsId', stsController.updateSTS);
router.delete('/:stsId', stsController.deleteSTS);
router.post('/:stsId/manager', stsController.assignManagerToSTS);
router.post('/:stsId/truck', stsController.assignTruckToSTS);
router.post('/:stsId/entry', stsController.addVehicleEntry);

module.exports = router;