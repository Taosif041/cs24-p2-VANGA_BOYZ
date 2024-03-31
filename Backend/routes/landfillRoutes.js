const express = require('express');
const landfillController = require('../controllers/landfillController');

const router = express.Router();

router.post('/', landfillController.createLandfill);
router.get('/', landfillController.getAllLandfills);
router.get('/:landfillId', landfillController.getLandfill);
router.put('/:landfillId', landfillController.updateLandfill);
router.delete('/:landfillId', landfillController.deleteLandfill);
router.post('/:landfillId/managers', landfillController.addManager);
router.delete('/:landfillId/managers', landfillController.deleteManager);
router.get('/:landfillId/managers', landfillController.getManagers);
//router.post('/:landfillId/entry', landfillController.addEntry);
//router.post('/:landfillId/receive', landfillController.receiveTruck);

module.exports = router;