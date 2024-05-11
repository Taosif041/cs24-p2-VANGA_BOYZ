const Notification = require('../models/notification');
const Issue = require('../models/issue');

// Create Notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      content: req.body.content,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
