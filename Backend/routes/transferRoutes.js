const express = require('express');
const transferWasteController = require('../controllers/transferWasteController');

const router = express.Router();

router.post('/arrival/sts', transferWasteController.arrivalAtSTS);
router.post('/departure/sts-to-landfill', transferWasteController.departureFromSTSToLandfill);
router.post('/arrival/landfill', transferWasteController.arrivalAtLandfill);
router.post('/departure/landfill-to-sts', transferWasteController.departureFromLandfillToSTS);
router.get('/waste-logs', transferWasteController.getAllWasteLogs);

module.exports = router;
