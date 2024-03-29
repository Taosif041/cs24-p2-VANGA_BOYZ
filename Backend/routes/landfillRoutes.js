const express = require('express');
const landfillController = require('../controllers/landfillController');

const router = express.Router();

router.post('/landfills', landfillController.createLandfill);
router.get('/landfills', landfillController.getAllLandfills);
router.get('/landfills/:landfillId', landfillController.getLandfill);
router.put('/landfills/:landfillId', landfillController.updateLandfill);
router.delete('/landfills/:landfillId', landfillController.deleteLandfill);
router.post('/landfills/:landfillId/managers', landfillController.assignManagers);
//router.post('/landfills/:landfillId/entry', landfillController.addEntry);
//router.post('/landfills/:landfillId/receive', landfillController.receiveTruck);


module.exports = router;
