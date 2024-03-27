const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {};



authController.initiatePasswordReset = async (req, res) => {
  // Implement your password reset initiation logic here
};

authController.confirmPasswordReset = async (req, res) => {
  // Implement your password reset confirmation logic here
};
authController.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in', error: error.toString() });
  }
};
authController.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, parseInt(process.env.SALT_ROUNDS));

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while changing the password', error: error.toString() });
  }
};

module.exports = authController;