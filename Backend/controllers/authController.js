const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {};
const User = require("../models/user");
const PasswordReset = require("../models/passwordReset");
const sendEmail = require("../services/passwordRecoveryEmail");
const crypto = require("crypto");
require("dotenv").config({ path: "../.env" });

authController.initiatePasswordReset = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const OTP = crypto.randomBytes(4).toString("hex");

    const passwordReset = new PasswordReset({
      email: req.body.email,
      otp: OTP,
    });

    await passwordReset.save();

    await sendEmail(req.body.email, OTP);

    res.status(200).json({ message: "Password reset initiated" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while initiating password reset",
        error: error.toString(),
      });
  }
};

authController.confirmPasswordReset = async (req, res) => {
  try {
    if (!req.body.email || !req.body.otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const passwordReset = await PasswordReset.findOne({
      email: req.body.email,
      otp: req.body.otp,
    });
    if (!passwordReset) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await passwordReset.deleteOne();

    const token = jwt.sign(
      { id: user._id, reset: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Password reset confirmed", token });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while confirming password reset",
        error: error.toString(),
      });
  }
};
authController.changePasswordInPasswordReset = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.user.reset) {
      return res.status(400).json({ message: "Password reset not initiated" });
    }

    if (!req.body.newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while changing the password",
        error: error.toString(),
      });
  }
};

authController.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.roles.length === 0) {
      return res
        .status(403)
        .json({
          message:
            "Unassigned user cannot enter the system. Wait for assignment.",
        });
    }

    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while logging in",
        error: error.toString(),
      });
  }
};
authController.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.body.newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }
    if (!req.body.currentPassword) {
      return res.status(400).json({ message: "Current password is required" });
    }
    const validPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while changing the password",
        error: error.toString(),
      });
  }
};

module.exports = authController;
