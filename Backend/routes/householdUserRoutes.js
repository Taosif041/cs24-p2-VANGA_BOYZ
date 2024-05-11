const express = require('express');
const router = express.Router();

// Import your controllers here
const householdController = require('../controllers/householdUserControllers');
const authMiddleware=require('../middlewares/householdAuthMiddleware');
router.post('/login', householdController.login);
router.post('/register', householdController.register);
router.post('/issue',authMiddleware ,householdController.createIssue);
router.get('/notification', authMiddleware,householdController.getNotifications);
router.post('/community',authMiddleware ,householdController.createCommunityPost);
router.post('/sharing',authMiddleware ,householdController.createSharingPost);
router.get('/sharing', authMiddleware,householdController.getSharingPosts);
router.get('/community', authMiddleware,householdController.getCommunityPosts);
router.post('/community/:id/like',authMiddleware ,householdController.likeCommunityPost);
router.post('/community/:id/unlike', authMiddleware,householdController.unlikeCommunityPost);

router.post('/sharing/:id/upvote', authMiddleware,householdController.upvoteSharingPost);
router.post('/sharing/:id/downvote', authMiddleware,householdController.downvoteSharingPost);

module.exports = router;
