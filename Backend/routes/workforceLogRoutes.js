const express = require('express');
const router = express.Router();
const workforceLogController = require('../controllers/workforceLogController');

// Assign login time
router.post('/assignlogin', workforceLogController.postAssignLogin);
router.get('/assignlogin', workforceLogController.getAssignLogin);

// Assign logout time
router.post('/assignlogout', workforceLogController.postAssignLogout);
router.get('/assignlogout', workforceLogController.getAssignLogout);

// Permit leave
router.post('/permitleave', workforceLogController.postPermitLeave);
router.get('/permitleave', workforceLogController.getPermitLeave);

// Generate info for a day
router.post('/generateInfoForADay', workforceLogController.getGenerateInfoForADay);
router.post('/generateInfoForAMonth', workforceLogController.getGenerateInfoForAMonth);

module.exports = router;
