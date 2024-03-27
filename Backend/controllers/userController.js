const User = require("../models/user");
const Role = require("../models/role");
const RolesArrayValidator = require("../validators/rolesArray");
const userValidator = require("../validators/user");
const createUserValidator = require("../validators/createUser");
require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
exports.listAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving users",
      error: error.toString(),
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    console.log("getUserDetails");
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving user details",
      error: error.toString(),
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { error } = createUserValidator.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          message: "Validation failed",
          error: error.details[0].message,
        });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Get the salt rounds from the environment variable
    const saltRounds = Number(process.env.SALT_ROUNDS);

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    
    const newUser = new User(req.body);
   
  
    await newUser.save();
    // Delete the password field before sending the user details
    const newUser1 = { ...newUser._doc };
    delete newUser1.password;

    res.status(201).json(newUser1);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while creating the user",
        error: error.toString(),
      });
  }
};
exports.updateUserDetails = async (req, res) => {
  try {
    const { error } = userValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.toString(),
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the user",
        error: error.toString(),
      });
  }
};
exports.listAllRoles = async (req, res) => {
  try {
    console.log("listAllRoles");  
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving roles",
        error: error.toString(),
      });
  }
};
exports.updateUserRoles = async (req, res) => {
  try {
    const { error } = RolesArrayValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    const roleNames = req.body;
    const roles = await Role.find({ name: { $in: roleNames } });
    if (roles.length !== roleNames.length) {
      return res.status(400).json({ message: "One or more roles are invalid" });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.roles = roles;
    await user.save();
    // Delete the password field before sending the user details
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating user roles",
      error: error.toString(),
    });
  }
};
